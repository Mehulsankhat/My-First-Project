-- Staff self-registration and approval workflow. Run once in Supabase SQL Editor.
-- Existing profiles are preserved. Only approved accounts receive a profiles row.

create table if not exists public.staff_registration_requests (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  requested_role text not null check (requested_role in ('teacher','principal','admin')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.staff_registration_requests enable row level security;
drop policy if exists staff_requests_admin_select on public.staff_registration_requests;
create policy staff_requests_admin_select on public.staff_registration_requests
for select to authenticated using (public.current_school_role() in ('admin','principal'));
revoke all on public.staff_registration_requests from anon, authenticated;
grant select on public.staff_registration_requests to authenticated;

create or replace function public.capture_staff_registration()
returns trigger language plpgsql security definer set search_path = public, auth
as $$
declare r text; n text; p text;
begin
  r := lower(coalesce(new.raw_user_meta_data->>'requested_role',''));
  if r not in ('teacher','principal','admin') then return new; end if;
  n := nullif(trim(coalesce(new.raw_user_meta_data->>'full_name','')), '');
  p := nullif(trim(coalesce(new.raw_user_meta_data->>'phone','')), '');
  if n is null then n := split_part(new.email,'@',1); end if;
  insert into public.staff_registration_requests(auth_user_id,full_name,email,phone,requested_role)
  values(new.id,n,new.email,p,r) on conflict(auth_user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_staff_registration on auth.users;
create trigger on_auth_user_staff_registration after insert on auth.users
for each row execute procedure public.capture_staff_registration();

-- Principal and Admin share the approval capability. Keep the actual role distinct in profiles.
create or replace function public.approve_staff_registration(request_id uuid)
returns void language plpgsql security definer set search_path = public, auth
as $$
declare req public.staff_registration_requests%rowtype; actor_role text;
begin
  select role into actor_role from public.profiles where id=auth.uid();
  if actor_role not in ('admin','principal') then raise exception 'Only an approved Admin or Principal can approve registrations'; end if;
  select * into req from public.staff_registration_requests where id=request_id for update;
  if not found then raise exception 'Registration request not found'; end if;
  if req.status <> 'pending' then raise exception 'This request has already been reviewed'; end if;
  insert into public.profiles(id,full_name,role) values(req.auth_user_id,req.full_name,req.requested_role)
  on conflict(id) do update set full_name=excluded.full_name, role=excluded.role;
  update public.staff_registration_requests set status='approved',reviewed_by=auth.uid(),reviewed_at=now() where id=request_id;
end; $$;

create or replace function public.reject_staff_registration(request_id uuid)
returns void language plpgsql security definer set search_path = public, auth
as $$
declare actor_role text;
begin
  select role into actor_role from public.profiles where id=auth.uid();
  if actor_role not in ('admin','principal') then raise exception 'Only an approved Admin or Principal can reject registrations'; end if;
  update public.staff_registration_requests set status='rejected',reviewed_by=auth.uid(),reviewed_at=now()
  where id=request_id and status='pending';
  if not found then raise exception 'Pending registration request not found'; end if;
end; $$;

revoke all on function public.approve_staff_registration(uuid) from public, anon;
revoke all on function public.reject_staff_registration(uuid) from public, anon;
grant execute on function public.approve_staff_registration(uuid) to authenticated;
grant execute on function public.reject_staff_registration(uuid) to authenticated;

-- Make Principal equivalent to Admin for existing school data RLS policies,
-- while retaining the distinct 'principal' role in profiles for approval UI.
create or replace function public.current_school_role()
returns text language sql stable security definer set search_path = public
as $$ select case when role='principal' then 'admin' else role end from public.profiles where id=auth.uid() limit 1 $$;
