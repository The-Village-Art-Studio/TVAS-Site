import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

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
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with .webp extension
    const uniqueFilename = `${uuidv4()}.webp`;
    
    // Save to public/uploads after converting to webp
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, uniqueFilename);
    
    let pipeline = sharp(buffer);

    // Apply manual crop if coordinates are provided
    if (cropX !== null && cropY !== null && cropWidth !== null && cropHeight !== null) {
      pipeline = pipeline.extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight });
    }

    // If it's a member profile photo, resize to final 800x800
    if (type === 'member') {
      pipeline = pipeline.resize(800, 800, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    await pipeline
      .webp({ quality: 80 })
      .toFile(filepath);
    
    // Return the public URL
    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
