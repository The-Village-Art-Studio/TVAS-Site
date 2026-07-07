import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { supabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

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

    // Generate unique filename with .webp extension
    const uniqueFilename = `${uuidv4()}.webp`;

    let pipeline = sharp(buffer);

    // Apply manual crop if coordinates are provided
    if (cropX !== null && cropY !== null && cropWidth !== null && cropHeight !== null) {
      pipeline = pipeline.extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight });
    }

    // If it's a member profile, showcase, or podcast photo, resize to final 800x800
    if (['member', 'showcase', 'podcast', 'event'].includes(type || '')) {
      pipeline = pipeline.resize(800, 800, {
        fit: 'cover',
        position: 'center',
      });
    }

    // Process image to a Buffer (instead of writing to disk)
    const processedBuffer = await pipeline.webp({ quality: 80 }).toBuffer();

    // Upload to Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(uniqueFilename, processedBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json({ success: false, error: `Upload to storage failed: ${error.message}` }, { status: 500 });
    }

    // Get the public URL for this file
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(uniqueFilename);

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
