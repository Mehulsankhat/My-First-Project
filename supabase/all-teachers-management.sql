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
    CASE WHEN EXISTS (SELECT 1 FROM public.staff_account_removals d WHERE d.auth_user_id=c.uid) THEN 'removed'
         WHEN EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=c.uid AND p.role='teacher') THEN 'approved'
         WHEN bool_or(c.request_status='pending') THEN 'pending'
         WHEN bool_or(c.request_status='rejected') THEN 'rejected'
         ELSE 'pending' END,
    MAX(c.standard)
  FROM candidates c GROUP BY c.uid ORDER BY 2;
END $$;
REVOKE ALL ON FUNCTION public.list_teacher_accounts_for_management() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.list_teacher_accounts_for_management() TO authenticated;

-- Extend account removal so pending/rejected teachers (without a profile) can
-- also be removed by ID from the unified directory. Admin/Principal are excluded.
CREATE OR REPLACE FUNCTION public.remove_teacher_account_access(target_teacher_id uuid DEFAULT NULL,target_request_id uuid DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE teacher_id uuid; actor_role text;
BEGIN
 SELECT role INTO actor_role FROM public.profiles WHERE id=auth.uid();
 IF auth.uid() IS NULL OR actor_role NOT IN ('admin','principal') OR EXISTS
   (SELECT 1 FROM public.staff_account_removals WHERE auth_user_id=auth.uid()) THEN
  RAISE EXCEPTION 'Only active Admin or Principal can remove teacher accounts'; END IF;
 IF (target_teacher_id IS NULL) = (target_request_id IS NULL) THEN
  RAISE EXCEPTION 'Provide exactly one teacher ID or request ID'; END IF;
 IF target_request_id IS NOT NULL THEN
  SELECT auth_user_id INTO teacher_id FROM public.staff_registration_requests
   WHERE id=target_request_id AND requested_role='teacher' FOR UPDATE;
 ELSE
  SELECT target_teacher_id INTO teacher_id WHERE EXISTS
   (SELECT 1 FROM public.profiles WHERE id=target_teacher_id AND role='teacher')
   OR EXISTS (SELECT 1 FROM public.staff_registration_requests WHERE auth_user_id=target_teacher_id AND requested_role='teacher');
 END IF;
 IF teacher_id IS NULL THEN RAISE EXCEPTION 'Teacher account not found'; END IF;
 IF teacher_id=auth.uid() THEN RAISE EXCEPTION 'Cannot remove your own account'; END IF;
 IF EXISTS (SELECT 1 FROM public.profiles WHERE id=teacher_id AND role IN ('admin','principal')) THEN
  RAISE EXCEPTION 'Admin and Principal accounts cannot be removed here'; END IF;
 INSERT INTO public.staff_account_removals(auth_user_id,removed_by)
 VALUES(teacher_id,auth.uid()) ON CONFLICT(auth_user_id)
 DO UPDATE SET removed_by=excluded.removed_by,removed_at=now();
 DELETE FROM public.profiles WHERE id=teacher_id AND role='teacher';
 UPDATE public.staff_registration_requests SET status='rejected',reviewed_by=auth.uid(),reviewed_at=now()
 WHERE auth_user_id=teacher_id AND requested_role='teacher';
END $$;
REVOKE ALL ON FUNCTION public.remove_teacher_account_access(uuid,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.remove_teacher_account_access(uuid,uuid) TO authenticated;
