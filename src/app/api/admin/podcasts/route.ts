import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const podcast = await prisma.podcast.create({
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
    console.error("Create podcast error:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create podcast' 
    }, { status: 500 });
  }
}
