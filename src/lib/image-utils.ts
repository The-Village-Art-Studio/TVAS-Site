import { supabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

/**
 * Extracts the filename from a Supabase Storage public URL and
 * deletes the file from the Supabase Storage bucket.
 */
export async function deleteStorageImage(imageUrl: string | null | undefined) {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);

    // Supabase Storage public URLs look like:
    // https://<project>.supabase.co/storage/v1/object/public/<bucket>/<filename>
    const bucketPrefix = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
    if (!url.pathname.includes(bucketPrefix)) {
      // Not a Supabase Storage URL — skip silently
      return;
    }

    const filename = url.pathname.split(bucketPrefix)[1];
    if (!filename) return;

    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove([filename]);

    if (error) {
      console.error(`Failed to delete storage image ${filename}:`, error);
    } else {
      console.log(`Successfully deleted storage image: ${filename}`);
    }
  } catch (error) {
    console.error(`Failed to parse/delete image URL ${imageUrl}:`, error);
  }
}
