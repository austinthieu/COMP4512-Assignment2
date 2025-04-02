import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  console.error('Supabase key is not defined!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
