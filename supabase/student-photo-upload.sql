-- Run in the connected Supabase SQL Editor. Existing records are preserved.
alter table public.students add column if not exists photo_url text;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('student-photos','student-photos',false,3145728,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false,file_size_limit=3145728,
allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists student_photos_staff_read on storage.objects;
drop policy if exists student_photos_owner_insert on storage.objects;
drop policy if exists student_photos_owner_delete on storage.objects;
create policy student_photos_staff_read on storage.objects for select to authenticated
using (bucket_id='student-photos' and exists (
select 1 from public.profiles p where p.id=(select auth.uid())
and p.role in ('admin','principal','teacher')));
create policy student_photos_owner_insert on storage.objects for insert to authenticated
with check (bucket_id='student-photos'
and (storage.foldername(name))[1]=(select auth.uid())::text
and exists (select 1 from public.profiles p where p.id=(select auth.uid())
and p.role in ('admin','principal','teacher')));
create policy student_photos_owner_delete on storage.objects for delete to authenticated
using (bucket_id='student-photos'
and (storage.foldername(name))[1]=(select auth.uid())::text);
