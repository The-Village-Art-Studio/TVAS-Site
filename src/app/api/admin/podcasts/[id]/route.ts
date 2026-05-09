import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteLocalImage } from '@/lib/image-utils';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Fetch existing podcast to check for old image
    const oldPodcast = await prisma.podcast.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

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

    // If image changed, delete old one
    if (oldPodcast && oldPodcast.imageUrl !== data.imageUrl) {
      await deleteLocalImage(oldPodcast.imageUrl);
    }

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
    
    // Fetch podcast to get image URL before deleting
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

    await prisma.podcast.delete({
      where: { id }
    });

    // Delete image if it exists
    if (podcast?.imageUrl) {
      await deleteLocalImage(podcast.imageUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete podcast error:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete podcast' 
    }, { status: 500 });
  }
}
