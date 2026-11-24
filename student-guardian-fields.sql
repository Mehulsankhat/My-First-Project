-- Run once in Supabase SQL Editor to ensure guardian fields exist on existing databases.
alter table public.students
  add column if not exists guardian_name text,
  add column if not exists guardian_phone text;

-- Existing records are left unchanged. New manual and CSV uploads require both fields in the app.
