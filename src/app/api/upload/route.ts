import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type = data.get('type') as string | null;

    // Crop coordinates
    const cropX = data.get('cropX') ? parseInt(data.get('cropX') as string) : null;
    const cropY = data.get('cropY') ? parseInt(data.get('cropY') as string) : null;
    const cropWidth = data.get('cropWidth') ? parseInt(data.get('cropWidth') as string) : null;
    const cropHeight = data.get('cropHeight') ? parseInt(data.get('cropHeight') as string) : null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with .jpg extension
    const uniqueFilename = `${uuidv4()}.jpg`;

    // Load the native image dependency only after the request reaches the handler.
    // This lets Vercel return a useful JSON error if the runtime cannot load it.
    const { default: sharp } = await import('sharp');
    let pipeline = sharp(buffer);

    // Apply manual crop if coordinates are provided
    if (
      cropX !== null && !isNaN(cropX) &&
      cropY !== null && !isNaN(cropY) &&
      cropWidth !== null && !isNaN(cropWidth) && cropWidth > 0 &&
      cropHeight !== null && !isNaN(cropHeight) && cropHeight > 0
    ) {
      try {
        pipeline = pipeline.extract({ left: Math.max(0, cropX), top: Math.max(0, cropY), width: cropWidth, height: cropHeight });
      } catch (cropErr) {
        console.warn('Crop extract failed, falling back to auto resize:', cropErr);
      }
    }

    // If it's a member profile, showcase, or podcast photo, resize to final 800x800
    if (['member', 'showcase', 'podcast', 'event'].includes(type || '')) {
      pipeline = pipeline.resize(800, 800, {
        fit: 'cover',
        position: 'center',
      });
    }

    // Process image to a Buffer (instead of writing to disk)
    const processedBuffer = await pipeline.jpeg({ quality: 85 }).toBuffer();

    // Upload to Supabase Storage
    const supabaseAdmin = getSupabaseAdmin();
    const { data: uploadData, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(uniqueFilename, processedBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json({ success: false, error: `Upload to storage failed: ${error.message}` }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(uploadData.path);

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ success: false, error: `Upload failed: ${message}` }, { status: 500 });
  }
}
