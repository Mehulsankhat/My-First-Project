import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (value: unknown, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const payload = await req.json();
    const keys = ['p_gr', 'p_roll', 'p_year', 'p_exam'] as const;
    const limits = [40, 20, 12, 100];
    if (keys.some((key, i) => typeof payload?.[key] !== 'string' || !payload[key].trim() || payload[key].length > limits[i])) {
      return json({ error: 'Invalid search details' }, 400);
    }
    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) return json({ error: 'Server configuration missing' }, 500);
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data: result, error: resultError } = await admin.rpc('lookup_public_student_result', payload);
    if (resultError) return json({ error: 'Result lookup failed' }, 500);
    if (!result?.subjects?.length) return json(null);
    // Only after all four search values match a published result do we look up the photo.
    const { data: students, error: studentError } = await admin.from('students')
      .select('photo_url,admission_no,roll_no')
      .ilike('admission_no', payload.p_gr.trim())
      .eq('roll_no', payload.p_roll.trim()).limit(2);
    if (studentError) return json({ ...result, photo_url: null });
    const matched = students?.find(s => String(s.admission_no).trim().toLowerCase() === payload.p_gr.trim().toLowerCase() && String(s.roll_no).trim() === payload.p_roll.trim());
    let photo_url: string | null = null;
    if (matched?.photo_url) {
      const { data: signed, error: signError } = await admin.storage.from('student-photos').createSignedUrl(matched.photo_url, 300);
      if (!signError) photo_url = signed?.signedUrl ?? null;
    }
    return json({ ...result, photo_url });
  } catch (_error) { return json({ error: 'Invalid request' }, 400); }
});
