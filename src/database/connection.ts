import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

export const connection = createClient(String(process.env.URL), String(process.env.KEY));