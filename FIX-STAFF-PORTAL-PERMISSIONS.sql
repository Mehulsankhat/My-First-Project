-- School staff portal: minimal, repeatable permission repair.
-- Run ONCE in Supabase SQL Editor (Database/postgres role), after existing schema migrations.
-- Preserves students, marks, attendance, registration requests and accounts.
-- Does not bypass RLS; authenticated SELECT still follows the admin/principal policy.

BEGIN;

-- Only signed-in users get table-level SELECT; row-level security limits rows.
ALTER TABLE public.staff_registration_requests ENABLE ROW LEVEL SECURITY;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON TABLE public.staff_registration_requests TO authenticated;

-- SECURITY DEFINER helper checks the private removals table without granting
-- direct SELECT to every authenticated user. Owned by postgres when run in SQL Editor.
CREATE OR REPLACE FUNCTION public.can_manage_staff_requests()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $helper$
  SELECT (SELECT auth.uid()) IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = (SELECT auth.uid())
      AND p.role IN ('admin', 'principal')
      AND NOT EXISTS (
        SELECT 1 FROM public.staff_account_removals r
        WHERE r.auth_user_id = p.id
      )
  );
$helper$;
REVOKE ALL ON FUNCTION public.can_manage_staff_requests() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_staff_requests() TO authenticated;

-- The SELECT policy calls the helper, avoiding an invoker permission error
-- on staff_account_removals. No direct access to the removals table is needed.
DROP POLICY IF EXISTS staff_requests_admin_select ON public.staff_registration_requests;
CREATE POLICY staff_requests_admin_select ON public.staff_registration_requests
FOR SELECT TO authenticated
USING ((SELECT public.can_manage_staff_requests()));

-- The removal list is read internally by SECURITY DEFINER functions.
-- Do not expose the removal table directly to all logged-in users.
REVOKE ALL ON TABLE public.staff_account_removals FROM anon, authenticated;

-- Reinstall the directory RPC with a fixed signature and no removed teachers.
-- Run after teacher-pending-account-removal.sql. No student/marks data is changed.
-- Principal/Admin see ALL registered teachers, including those without a standard.
CREATE OR REPLACE FUNCTION public.list_teacher_accounts_for_management()
RETURNS TABLE(auth_user_id uuid, full_name text, email text, account_status text, assigned_standard text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public,auth AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id=auth.uid() AND p.role IN ('admin','principal')
    AND NOT EXISTS (SELECT 1 FROM public.staff_account_removals r WHERE r.auth_user_id=p.id)
  ) THEN RAISE EXCEPTION 'Only Admin or Principal can list teachers'; END IF;
  RETURN QUERY
  WITH candidates AS (
    SELECT p.id AS uid, p.full_name::text AS pname, p.assigned_standard::text AS standard,
           NULL::text AS mail, NULL::text AS request_status
    FROM public.profiles p WHERE p.role='teacher'
    UNION ALL
    SELECT r.auth_user_id, r.full_name::text, NULL::text, r.email::text, r.status::text
    FROM public.staff_registration_requests r WHERE r.requested_role='teacher'
  )
  SELECT c.uid,
    COALESCE(MAX(c.pname) FILTER (WHERE c.standard IS NOT NULL), MAX(c.pname)),
    MAX(c.mail),
    CASE WHEN EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=c.uid AND p.role='teacher') THEN 'approved'
         WHEN bool_or(c.request_status='pending') THEN 'pending'
         WHEN bool_or(c.request_status='rejected') THEN 'rejected'
         ELSE 'pending' END,
    MAX(c.standard)
  FROM candidates c
  WHERE NOT EXISTS (SELECT 1 FROM public.staff_account_removals d WHERE d.auth_user_id=c.uid)
  GROUP BY c.uid ORDER BY 2;
END $$;
REVOKE ALL ON FUNCTION public.list_teacher_accounts_for_management() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.list_teacher_accounts_for_management() TO authenticated;


-- Keep EXECUTE on the RPC limited to authenticated users; its body checks role.
REVOKE ALL ON FUNCTION public.list_teacher_accounts_for_management() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.list_teacher_accounts_for_management() TO authenticated;

COMMIT;

-- Check grants (expected: true, true, false).
SELECT
 has_table_privilege('authenticated','public.staff_registration_requests','SELECT') AS registration_select,
 has_function_privilege('authenticated','public.list_teacher_accounts_for_management()','EXECUTE') AS directory_execute,
 has_table_privilege('authenticated','public.staff_account_removals','SELECT') AS removal_table_exposed;
