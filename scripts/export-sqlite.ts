/**
 * scripts/export-sqlite.ts
 *
 * Reads all data from the local SQLite database (dev.db or a downloaded prod.db)
 * and exports it to a backup.json file.
 *
 * It also rewrites all local /uploads/ image URLs to their equivalent
 * Supabase Storage public URLs so they are ready for import.
 *
 * Usage:
 *   1. Copy prod.db from the Droplet to the project root:
 *      scp root@143.110.211.200:/var/www/tvas-site/prod.db ./prod.db
 *
 *   2. Set DATABASE_URL in your .env to point to the downloaded prod.db:
 *      DATABASE_URL="file:/Users/yourname/path/to/TVAS-Site/prod.db"
 *
 *   3. Set your Supabase URL in your .env:
 *      NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
 *
 *   4. Run this script:
 *      npx tsx scripts/export-sqlite.ts
 *
 *   This will create a backup.json in the project root.
 */

import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = 'tvas-assets';

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env');
  process.exit(1);
}
if (!SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env');
  process.exit(1);
}

const supabaseStorageBase = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

function rewriteUrl(url: string | null | undefined): string | null | undefined {
  if (!url || !url.startsWith('/uploads/')) return url;
  const filename = url.replace('/uploads/', '');
  return `${supabaseStorageBase}/${filename}`;
}

function rewriteGalleryItems(galleryJson: string): string {
  try {
    const items = JSON.parse(galleryJson);
    const updated = items.map((item: any) => ({
      ...item,
      url: rewriteUrl(item.url) ?? item.url,
    }));
    return JSON.stringify(updated);
  } catch {
    return galleryJson;
  }
}

async function main() {
  console.log('🔄 Connecting to SQLite database:', DATABASE_URL);
  const client = createClient({ url: DATABASE_URL as string });

  const backup: Record<string, any[]> = {};

  // Export Members
  console.log('  → Exporting Members...');
  const members = await client.execute('SELECT * FROM Member');
  backup.members = members.rows.map((r: any) => ({
    ...r,
    imageUrl: rewriteUrl(r.imageUrl),
  }));
  console.log(`     ${backup.members.length} members`);

  // Export Showcases
  console.log('  → Exporting Showcases...');
  const showcases = await client.execute('SELECT * FROM Showcase');
  backup.showcases = showcases.rows.map((r: any) => ({
    ...r,
    imageUrl: rewriteUrl(r.imageUrl),
    galleryItems: rewriteGalleryItems(r.galleryItems),
  }));
  console.log(`     ${backup.showcases.length} showcases`);

  // Export Podcasts
  console.log('  → Exporting Podcasts...');
  const podcasts = await client.execute('SELECT * FROM Podcast');
  backup.podcasts = podcasts.rows.map((r: any) => ({
    ...r,
    imageUrl: rewriteUrl(r.imageUrl),
  }));
  console.log(`     ${backup.podcasts.length} podcasts`);

  // Export Events
  console.log('  → Exporting Events...');
  const events = await client.execute('SELECT * FROM Event');
  backup.events = events.rows.map((r: any) => ({
    ...r,
    imageUrl: rewriteUrl(r.imageUrl),
  }));
  console.log(`     ${backup.events.length} events`);

  // Export Leads
  console.log('  → Exporting Leads...');
  const leads = await client.execute('SELECT * FROM Lead');
  backup.leads = leads.rows as any[];
  console.log(`     ${backup.leads.length} leads`);

  // Export SiteSettings
  console.log('  → Exporting SiteSettings...');
  const settings = await client.execute('SELECT * FROM SiteSetting');
  backup.siteSettings = settings.rows.map((r: any) => ({
    ...r,
    value: r.key?.endsWith('_cover') || r.key?.endsWith('_image')
      ? (rewriteUrl(r.value) ?? r.value)
      : r.value,
  }));
  console.log(`     ${backup.siteSettings.length} settings`);

  const outputPath = path.join(process.cwd(), 'backup.json');
  fs.writeFileSync(outputPath, JSON.stringify(backup, null, 2), 'utf-8');
  console.log(`\n✅ Backup written to ${outputPath}`);
}

main().catch((err) => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
