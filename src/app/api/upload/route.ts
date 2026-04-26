import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get file extension
    const originalName = file.name;
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    
    // Generate unique filename
    const uniqueFilename = `${uuidv4()}${extension}`;
    
    // Save to public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, uniqueFilename);
    
    await writeFile(filepath, buffer);
    
    // Return the public URL
    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
