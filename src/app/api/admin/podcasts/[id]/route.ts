import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const podcast = await prisma.podcast.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleFr: data.titleFr,
        artist: data.artist,
        descriptionEn: data.descriptionEn,
        descriptionFr: data.descriptionFr,
        youtubeId: data.youtubeId,
        imageUrl: data.imageUrl,
        listenUrl: data.listenUrl,
      }
    });

    return NextResponse.json({ success: true, podcast });
  } catch (error: any) {
    console.error("Update podcast error:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update podcast' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await prisma.podcast.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete podcast error:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete podcast' 
    }, { status: 500 });
  }
}
