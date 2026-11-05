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
