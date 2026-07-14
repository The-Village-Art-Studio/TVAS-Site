import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('URL or Key missing');
  process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.storage.getBucket('tvas-assets');
  if (error) {
    console.error('Error fetching bucket:', error);
  } else {
    console.log('Bucket data:', data);
  }
}

check();
