-- Run AFTER teacher-website-approval-migration.sql and teacher-standard-access-migration.sql.
-- Preserves ALL student/marks/result data. Website "Delete Account" revokes access,
-- but does not physically delete auth.users (which can break historical FK references).
CREATE TABLE IF NOT EXISTS public.staff_account_removals (
  auth_user_id uuid PRIMARY KEY,
  removed_by uuid,
  removed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.staff_account_removals ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.staff_account_removals FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.my_staff_approval_status()
RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE state text;
BEGIN
 IF auth.uid() IS NULL THEN RETURN 'signed_out'; END IF;
 IF EXISTS(SELECT 1 FROM public.staff_account_removals WHERE auth_user_id=auth.uid()) THEN RETURN 'removed'; END IF;
 IF EXISTS(SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role IN ('admin','principal','teacher')) THEN RETURN 'approved'; END IF;
 SELECT status INTO state FROM public.staff_registration_requests WHERE auth_user_id=auth.uid();
 RETURN COALESCE(state,'pending');
END $$;
REVOKE ALL ON FUNCTION public.my_staff_approval_status() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.my_staff_approval_status() TO authenticated;

CREATE OR REPLACE FUNCTION public.remove_teacher_account_access(target_teacher_id uuid DEFAULT NULL,target_request_id uuid DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE teacher_id uuid; actor_role text;
BEGIN
 SELECT role INTO actor_role FROM public.profiles WHERE id=auth.uid();
 IF auth.uid() IS NULL OR actor_role NOT IN ('admin','principal') THEN
  RAISE EXCEPTION 'Only Admin or Principal can remove teacher accounts';
 END IF;
 IF (target_teacher_id IS NULL) = (target_request_id IS NULL) THEN
  RAISE EXCEPTION 'Provide exactly one teacher ID or request ID';
 END IF;
 IF target_request_id IS NOT NULL THEN
  SELECT auth_user_id INTO teacher_id FROM public.staff_registration_requests
   WHERE id=target_request_id AND requested_role='teacher' FOR UPDATE;
 ELSE
  SELECT id INTO teacher_id FROM public.profiles WHERE id=target_teacher_id AND role='teacher' FOR UPDATE;
 END IF;
 IF teacher_id IS NULL THEN RAISE EXCEPTION 'Teacher account not found'; END IF;
 IF teacher_id=auth.uid() THEN RAISE EXCEPTION 'Cannot remove your own account'; END IF;
 INSERT INTO public.staff_account_removals(auth_user_id,removed_by)
  VALUES(teacher_id,auth.uid()) ON CONFLICT(auth_user_id)
  DO UPDATE SET removed_by=excluded.removed_by,removed_at=now();
 DELETE FROM public.profiles WHERE id=teacher_id AND role='teacher';
 UPDATE public.staff_registration_requests SET status='rejected',reviewed_by=auth.uid(),reviewed_at=now()
  WHERE auth_user_id=teacher_id AND requested_role='teacher';
END $$;
REVOKE ALL ON FUNCTION public.remove_teacher_account_access(uuid,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.remove_teacher_account_access(uuid,uuid) TO authenticated;

-- Prevent a previously removed teacher from being approved again via a stale request.
-- Approval function from prior migration is wrapped by a replacement with tombstone check.
CREATE OR REPLACE FUNCTION public.approve_staff_registration(request_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE req public.staff_registration_requests%rowtype; actor_role text;
BEGIN
 SELECT role INTO actor_role FROM public.profiles WHERE id=auth.uid();
 IF auth.uid() IS NULL OR actor_role NOT IN ('admin','principal') THEN
  RAISE EXCEPTION 'Only Admin or Principal can approve teachers';
 END IF;
 SELECT * INTO req FROM public.staff_registration_requests WHERE id=request_id FOR UPDATE;
 IF NOT FOUND OR req.status <> 'pending' OR req.requested_role <> 'teacher' THEN
  RAISE EXCEPTION 'Pending teacher request not found';
 END IF;
 IF EXISTS(SELECT 1 FROM public.staff_account_removals WHERE auth_user_id=req.auth_user_id) THEN
  RAISE EXCEPTION 'This teacher account was removed';
 END IF;
 INSERT INTO public.profiles(id,full_name,role) VALUES(req.auth_user_id,req.full_name,'teacher')
 ON CONFLICT(id) DO UPDATE SET full_name=excluded.full_name,role='teacher';
 UPDATE public.staff_registration_requests SET status='approved',reviewed_by=auth.uid(),reviewed_at=now() WHERE id=request_id;
END $$;
REVOKE ALL ON FUNCTION public.approve_staff_registration(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.approve_staff_registration(uuid) TO authenticated;
