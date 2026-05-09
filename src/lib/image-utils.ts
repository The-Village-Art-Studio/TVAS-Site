import { unlink } from 'fs/promises';
import { join } from 'path';

/**
 * Deletes a local image file from the public/uploads directory
 * if the URL matches the /uploads/ pattern.
 */
export async function deleteLocalImage(imageUrl: string | null | undefined) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) {
    return;
  }

  try {
    const filename = imageUrl.replace('/uploads/', '');
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await unlink(filepath);
    console.log(`Successfully deleted local image: ${filepath}`);
  } catch (error) {
    console.error(`Failed to delete local image ${imageUrl}:`, error);
  }
}
