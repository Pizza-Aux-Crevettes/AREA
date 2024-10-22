import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'The environment variables REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are required.'
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
