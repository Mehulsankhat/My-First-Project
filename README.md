# My-First-Project
My first HTML CSS JavaScript project

# Government Secondary School, Bildi — Supabase-connected starter

## Setup

1. Install Node.js (LTS).
2. In this folder, run:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` in the project root.
4. Set the values in `.env`:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your Supabase Publishable key (`sb_publishable_...`)
5. Run locally:

   ```bash
   npm run dev
   ```

## Supabase database requirements

Run the SQL setup provided in the ChatGPT instructions to create `profiles`, `notices`, `homework`, the `current_staff_role()` function, and the RLS policies.

Create staff accounts in Supabase Authentication > Users. Then add each user's UUID to `public.profiles` with role `admin` or `teacher`.

## Features

- Supabase email/password authentication
- Role lookup from `public.profiles`
- Admin can publish/delete notices
- Teacher can publish homework
- Staff records and content are stored in Supabase
- Public homepage displays latest notices from Supabase when available

## Security

- Only use the Supabase Publishable key in this frontend.
- Never put a Supabase Secret key or service-role key in `.env` or frontend code.
- RLS policies must be enabled and correctly configured before using real student data.
- Do not store sensitive student records until the school has approved access rules and privacy procedures.
- `.env` is ignored by git. Keep it private.

## Staff self-registration and approval
1. In Supabase Dashboard → SQL Editor, run `supabase/staff-registration-approval.sql` once.
2. Keep the existing Admin profile intact. Admin or approved Principal can review pending Teacher, Principal, and Admin registrations in the Staff Portal.
3. New users choose their requested role during registration. They receive no staff profile/access until an authorized approver approves them. Supabase email confirmation may also need to be completed.
4. Teacher accounts cannot approve registrations. Approval/rejection is enforced in database functions, not only in the browser.
5. Copy your existing `.env` file (with the Supabase URL and publishable key) into the extracted project root. Never put a service-role key in the frontend.

Note: this migration expects `public.profiles` to have `id`, `full_name`, and `role` columns and to permit the role values `teacher`, `principal`, and `admin`.


## Student guardian details update
- Manual student entry now requires Guardian name and Guardian phone.
- CSV bulk upload requires `guardian_name` and `guardian_phone` columns and values.
- CSV headers are case-insensitive and accept spaces or common aliases such as `Parent Name`, `Guardian Mobile`, and `GR No`.
- Download the in-app CSV template for the exact supported column names.
- Run `supabase/student-guardian-fields.sql` once in Supabase SQL Editor. This adds missing columns without deleting existing student data.
- Existing student records are preserved. Records without guardian details remain blank until edited; the old “Guardian not added / No phone” placeholder is no longer displayed.


## Examination & Marks Management
- Staff can add, edit, delete and filter marks for students in Standards 9–12.
- Each record stores academic year, exam name, subject, marks obtained, maximum marks and remarks.
- Download filtered marks as UTF-8 CSV, which opens in Microsoft Excel.
- Run `supabase/exam-marks-management.sql` once in Supabase SQL Editor before using the module.
- The database enforces valid marks and prevents duplicate student + year + exam + subject records.
- Existing student, attendance and other records are not deleted.

## Automatic result, percentage, pass/fail and Top 10
- In Staff Portal → Examination & Marks Management, enter marks for students and save them.
- In the Automatic Result section, select the standard, academic year and exact exam name, then choose the pass percentage (default 33%).
- Generate Result calculates each student's overall percentage from total obtained marks divided by total maximum marks. A student is marked PASS only if every entered subject meets the selected pass percentage; otherwise FAIL.
- Students are ranked by overall percentage. Download the complete result or the first 10 ranks as Excel-compatible UTF-8 CSV files.
- The report uses the marks currently saved in `public.exam_marks`; it does not guess marks for subjects that have not been entered. Make sure all subjects for the exam are entered before finalizing results.
- Existing `supabase/exam-marks-management.sql` creates the marks table and staff access policies. Run it once if it has not already been applied.
