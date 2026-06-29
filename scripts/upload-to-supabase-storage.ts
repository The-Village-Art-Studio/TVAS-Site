/**
 * scripts/upload-to-supabase-storage.ts
 *
 * Uploads all files from the local public/uploads directory to
 * the Supabase Storage bucket (tvas-assets), preserving filenames.
 *
 * Usage:
 *   1. Download the uploads folder from the Droplet:
 *      scp -r root@143.110.211.200:/var/www/tvas-site/public/uploads ./public/
 *
 *   2. Make sure your .env has:
 *      NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
 *      SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
 *
 *   3. Run this script:
 *      npx tsx scripts/upload-to-supabase-storage.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'tvas-assets';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Map common extensions to MIME types
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const map: Record<string, string> = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
  };
  return map[ext] ?? 'application/octet-stream';
}

async function main() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error(`❌ Uploads directory not found: ${UPLOADS_DIR}`);
    console.error('   Download it first: scp -r root@143.110.211.200:/var/www/tvas-site/public/uploads ./public/');
    process.exit(1);
  }

  const files = fs.readdirSync(UPLOADS_DIR).filter((f) => !f.startsWith('.'));
  console.log(`🗂️  Found ${files.length} files to upload to Supabase Storage bucket "${BUCKET}"`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const filename of files) {
    const filepath = path.join(UPLOADS_DIR, filename);
    const fileBuffer = fs.readFileSync(filepath);
    const contentType = getMimeType(filename);

    process.stdout.write(`  → Uploading ${filename} ...`);

    const { error } = await supabase.storage.from(BUCKET).upload(filename, fileBuffer, {
      contentType,
      upsert: false, // Skip if already exists
    });

    if (error) {
      if (error.message?.includes('already exists') || (error as any).statusCode === '409') {
        console.log(' skipped (already exists)');
        skipCount++;
      } else {
        console.log(` ❌ FAILED: ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(' ✅');
      successCount++;
    }
  }

  console.log(`\n✅ Done: ${successCount} uploaded, ${skipCount} skipped, ${errorCount} failed`);
}

main().catch((err) => {
  console.error('❌ Upload script failed:', err);
  process.exit(1);
});
