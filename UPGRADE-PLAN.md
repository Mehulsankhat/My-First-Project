# Government Secondary School, Bildi — Upgrade Plan

This project keeps the existing Vite + Supabase application, school logo, bilingual public website, staff authentication, notices and homework.

## Phase 1 database foundation
1. Open Supabase Dashboard → SQL Editor.
2. Run `supabase/school-management-schema.sql`.
3. This creates student, attendance, exam, result, timetable, fee, event and gallery tables with Row Level Security (RLS).
4. Existing `profiles`, `notices` and `homework` tables are not dropped or replaced.

## Local development
1. Keep your existing `.env` file in the project root. Never upload it to GitHub or share its contents.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` before publishing.

## Important security notes
- Do not put a Supabase service-role/secret key in browser code or `.env` variables prefixed with `VITE_`.
- The SQL policies assume `profiles.id` references the same UUID as `auth.users.id`, and roles are exactly `admin` and `teacher`.
- Fees are admin-only. Student and exam information is not public.
- Student/parent self-service access is intentionally not enabled until a verified account-to-student relationship is implemented.
- Test policies with separate admin and teacher accounts before entering real student data.

## Planned application modules
Public school information, staff portal, student records, attendance, exams/results, timetable, fee records, events, gallery, and reports. Modules must be connected and tested against the schema before being treated as production-ready.
