import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('tvas_admin_auth')?.value !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const extensions: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };
    const extension = extensions[file.type];
    if (!extension) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image format. Please use JPG, PNG, or WebP.' },
        { status: 400 },
      );
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'The processed image is too large. Please choose a smaller image.' },
        { status: 400 },
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uniqueFilename = `${uuidv4()}.${extension}`;

    const supabaseAdmin = getSupabaseAdmin();
    const { data: uploadData, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(uniqueFilename, fileBuffer, {
        contentType: file.type,
        cacheControl: '31536000',
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
