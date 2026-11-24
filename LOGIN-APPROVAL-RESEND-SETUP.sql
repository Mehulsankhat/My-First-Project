-- Run in Supabase SQL Editor after staff-registration-approval.sql.
-- Resends by refreshing the existing pending request's timestamp, not by creating duplicates.
-- The Principal dashboard reads pending requests from staff_registration_requests.
ALTER TABLE public.staff_registration_requests
  ADD COLUMN IF NOT EXISTS last_resend_at timestamptz;

CREATE OR REPLACE FUNCTION public.resend_my_teacher_approval_request()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,auth AS $$
DECLARE req public.staff_registration_requests%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Please sign in first'; END IF;
  IF EXISTS(SELECT 1 FROM public.staff_account_removals WHERE auth_user_id=auth.uid()) THEN
    RAISE EXCEPTION 'Account access was removed. Contact Principal';
  END IF;
  SELECT * INTO req FROM public.staff_registration_requests
   WHERE auth_user_id=auth.uid() AND requested_role='teacher' FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Teacher registration request not found'; END IF;
  IF req.status <> 'pending' THEN RAISE EXCEPTION 'Only pending teacher requests can be resent'; END IF;
  IF req.last_resend_at IS NOT NULL AND req.last_resend_at > now()-interval '5 minutes' THEN
    RAISE EXCEPTION 'Please wait 5 minutes before resending';
  END IF;
  UPDATE public.staff_registration_requests SET last_resend_at=now(), created_at=now()
   WHERE id=req.id;
  RETURN 'Approval request refreshed successfully. Principal can see it in pending approvals.';
END $$;
REVOKE ALL ON FUNCTION public.resend_my_teacher_approval_request() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.resend_my_teacher_approval_request() TO authenticated;
