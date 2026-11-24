-- One-time migration. Does NOT delete any existing students, marks, or staff.
-- Admin/Principal assign teacher's one standard through website RPC.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS assigned_standard text;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_assigned_standard_valid;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_assigned_standard_valid CHECK (assigned_standard IS NULL OR assigned_standard IN ('9','10','11','12'));

CREATE OR REPLACE FUNCTION public.assign_teacher_standard(teacher_id uuid, new_standard text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF auth.uid() IS NULL OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role IN ('admin','principal')) THEN
   RAISE EXCEPTION 'Only Admin or Principal may assign teacher standards';
 END IF;
 IF new_standard IS NOT NULL AND new_standard NOT IN ('9','10','11','12') THEN RAISE EXCEPTION 'Invalid standard'; END IF;
 UPDATE public.profiles SET assigned_standard=new_standard WHERE id=teacher_id AND role='teacher';
 IF NOT FOUND THEN RAISE EXCEPTION 'Teacher profile not found'; END IF;
END $$;
REVOKE ALL ON FUNCTION public.assign_teacher_standard(uuid,text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.assign_teacher_standard(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.can_access_school_standard(target_standard text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=auth.uid() AND
   (p.role IN ('admin','principal') OR (p.role='teacher' AND p.assigned_standard IS NOT NULL AND p.assigned_standard=target_standard)));
$$;
REVOKE ALL ON FUNCTION public.can_access_school_standard(text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.can_access_school_standard(text) TO authenticated;

-- Replace previously permissive policies on the three student-linked tables.
-- Preserve unrelated policies for public website functionality.
DROP POLICY IF EXISTS students_admin_all ON public.students;
DROP POLICY IF EXISTS students_teacher_read ON public.students;
DROP POLICY IF EXISTS students_teacher_insert ON public.students;
DROP POLICY IF EXISTS students_standard_staff_select ON public.students;
DROP POLICY IF EXISTS students_standard_staff_insert ON public.students;
DROP POLICY IF EXISTS students_standard_management ON public.students;
CREATE POLICY students_standard_staff_select ON public.students FOR SELECT TO authenticated USING (public.can_access_school_standard(standard));
CREATE POLICY students_standard_staff_insert ON public.students FOR INSERT TO authenticated WITH CHECK (public.can_access_school_standard(standard));
CREATE POLICY students_standard_management ON public.students FOR UPDATE TO authenticated USING (public.can_access_school_standard(standard)) WITH CHECK (public.can_access_school_standard(standard));
CREATE POLICY students_standard_staff_delete ON public.students FOR DELETE TO authenticated USING (public.can_access_school_standard(standard));

DROP POLICY IF EXISTS attendance_admin_all ON public.attendance;
DROP POLICY IF EXISTS attendance_teacher_all ON public.attendance;
DROP POLICY IF EXISTS attendance_standard_staff ON public.attendance;
CREATE POLICY attendance_standard_staff ON public.attendance FOR ALL TO authenticated
 USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)))
 WITH CHECK (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)));

DROP POLICY IF EXISTS "Staff can read exam marks" ON public.exam_marks;
DROP POLICY IF EXISTS "Staff can add exam marks" ON public.exam_marks;
DROP POLICY IF EXISTS "Staff can edit exam marks" ON public.exam_marks;
DROP POLICY IF EXISTS "Staff can delete exam marks" ON public.exam_marks;
DROP POLICY IF EXISTS exam_marks_standard_staff ON public.exam_marks;
CREATE POLICY exam_marks_standard_staff ON public.exam_marks FOR ALL TO authenticated
 USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)))
 WITH CHECK (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)));

DROP POLICY IF EXISTS exam_results_admin_all ON public.exam_results;
DROP POLICY IF EXISTS exam_results_teacher_all ON public.exam_results;
DROP POLICY IF EXISTS exam_results_standard_staff ON public.exam_results;
CREATE POLICY exam_results_standard_staff ON public.exam_results FOR ALL TO authenticated
 USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)))
 WITH CHECK (EXISTS (SELECT 1 FROM public.students s WHERE s.id=student_id AND public.can_access_school_standard(s.standard)));

-- NOTE: existing custom permissive policies on these tables may still grant wider access.
-- Review pg_policies after running, especially policies added outside supplied project SQL.
