-- Run in Supabase SQL Editor after exam-marks-management.sql.
-- Read-only, exact-match public lookup. Does NOT grant anonymous table access.
-- GR + roll + academic year + exam are required. No student photo or contact data is returned.
CREATE OR REPLACE FUNCTION public.lookup_public_student_result(
  p_gr text, p_roll text, p_year text, p_exam text
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE v_student record; v_subjects jsonb; v_obtained numeric; v_maximum numeric;
BEGIN
  IF length(trim(coalesce(p_gr,''))) < 1 OR length(trim(coalesce(p_roll,''))) < 1
     OR length(trim(coalesce(p_year,''))) < 1 OR length(trim(coalesce(p_exam,''))) < 1
     OR length(p_gr) > 40 OR length(p_roll) > 20 OR length(p_year) > 12 OR length(p_exam) > 100 THEN
    RETURN NULL;
  END IF;
  SELECT s.id, s.full_name, s.admission_no, s.standard, s.division, s.roll_no
  INTO v_student FROM public.students s
  WHERE lower(trim(s.admission_no::text)) = lower(trim(p_gr))
    AND trim(s.roll_no::text) = trim(p_roll)
  ORDER BY s.id LIMIT 1;
  IF NOT FOUND THEN RETURN NULL; END IF;
  SELECT jsonb_agg(jsonb_build_object('subject',m.subject,'marks_obtained',m.marks_obtained,'max_marks',m.max_marks) ORDER BY m.subject),
         sum(m.marks_obtained),sum(m.max_marks)
  INTO v_subjects,v_obtained,v_maximum
  FROM public.exam_marks m WHERE m.student_id = v_student.id
    AND lower(trim(m.academic_year)) = lower(trim(p_year))
    AND lower(trim(m.exam_name)) = lower(trim(p_exam));
  IF v_subjects IS NULL OR v_maximum IS NULL OR v_maximum <= 0 THEN RETURN NULL; END IF;
  RETURN jsonb_build_object('full_name',v_student.full_name,'admission_no',v_student.admission_no,
    'standard',v_student.standard,'division',v_student.division,'roll_no',v_student.roll_no,
    'academic_year',p_year,'exam_name',p_exam,'subjects',v_subjects,
    'obtained',round(v_obtained,2),'maximum',round(v_maximum,2),
    'percentage',round(100*v_obtained/v_maximum,2),
    'result',CASE WHEN EXISTS (SELECT 1 FROM public.exam_marks m WHERE m.student_id=v_student.id
      AND lower(trim(m.academic_year))=lower(trim(p_year)) AND lower(trim(m.exam_name))=lower(trim(p_exam))
      AND 100*m.marks_obtained/m.max_marks < 33) THEN 'FAIL' ELSE 'PASS' END);
END;
$$;
REVOKE ALL ON FUNCTION public.lookup_public_student_result(text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_public_student_result(text,text,text,text) TO anon, authenticated;
