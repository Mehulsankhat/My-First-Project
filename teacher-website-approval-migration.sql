-- ONE-TIME MIGRATION: Website-only Teacher approvals by Admin OR Principal.
-- Does not delete students, marks, existing profiles or past approval records.
-- Run in Supabase SQL Editor once after deployment.

-- Only teacher self-registration is allowed going forward.
create or replace function public.capture_staff_registration()
returns trigger language plpgsql security definer set search_path = public, auth
as $$
declare n text; p text;
begin
  if lower(coalesce(new.raw_user_meta_data->>'requested_role','')) <> 'teacher' then
    return new;
  end if;
  n := nullif(trim(coalesce(new.raw_user_meta_data->>'full_name','')), '');
  p := nullif(trim(coalesce(new.raw_user_meta_data->>'phone','')), '');
  if n is null then n := split_part(new.email,'@',1); end if;
  insert into public.staff_registration_requests(auth_user_id,full_name,email,phone,requested_role)
  values(new.id,n,new.email,p,'teacher')
  on conflict(auth_user_id) do nothing;
  return new;
end; $$;

-- Trigger already exists from the earlier staff-registration-approval.sql.
-- Recreate only if missing, preserving existing requests.
drop trigger if exists on_auth_user_staff_registration on auth.users;
create trigger on_auth_user_staff_registration
  after insert on auth.users for each row
  execute function public.capture_staff_registration();

-- SECURITY DEFINER is necessary to write approved profiles, but only a signed-in
-- existing admin/principal can invoke it; requests are locked against double approval.
create or replace function public.approve_staff_registration(request_id uuid)
returns void language plpgsql security definer set search_path = public, auth
as $$
declare req public.staff_registration_requests%rowtype; actor_role text;
begin
  if auth.uid() is null then raise exception 'Please sign in first'; end if;
  select role into actor_role from public.profiles where id = auth.uid();
  if actor_role is null or actor_role not in ('admin','principal') then
    raise exception 'Only an approved Admin or Principal can approve teachers';
  end if;
  select * into req from public.staff_registration_requests where id=request_id for update;
  if not found then raise exception 'Registration request not found'; end if;
  if req.status <> 'pending' then raise exception 'Request has already been reviewed'; end if;
  if req.requested_role <> 'teacher' then
    raise exception 'Only Teacher registrations can be approved here';
  end if;
  insert into public.profiles(id,full_name,role)
    values(req.auth_user_id,req.full_name,'teacher')
    on conflict(id) do update set full_name=excluded.full_name,role='teacher';
  update public.staff_registration_requests
    set status='approved',reviewed_by=auth.uid(),reviewed_at=now()
    where id=request_id;
end; $$;

create or replace function public.reject_staff_registration(request_id uuid)
returns void language plpgsql security definer set search_path = public, auth
as $$
declare actor_role text;
begin
  if auth.uid() is null then raise exception 'Please sign in first'; end if;
  select role into actor_role from public.profiles where id=auth.uid();
  if actor_role is null or actor_role not in ('admin','principal') then
    raise exception 'Only an approved Admin or Principal can reject teachers';
  end if;
  update public.staff_registration_requests
    set status='rejected',reviewed_by=auth.uid(),reviewed_at=now()
    where id=request_id and status='pending' and requested_role='teacher';
  if not found then raise exception 'Pending teacher request not found'; end if;
end; $$;

revoke all on function public.approve_staff_registration(uuid) from public,anon;
revoke all on function public.reject_staff_registration(uuid) from public,anon;
grant execute on function public.approve_staff_registration(uuid) to authenticated;
grant execute on function public.reject_staff_registration(uuid) to authenticated;

-- Existing admin/principal profiles are retained. No new admin/principal signup.
-- Existing RLS policies still apply to staff data.
