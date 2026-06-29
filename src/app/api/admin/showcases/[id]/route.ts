import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteStorageImage } from '@/lib/image-utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Fetch existing showcase to check for removed images
    const oldShowcase = await prisma.showcase.findUnique({
      where: { id },
      select: { galleryItems: true, imageUrl: true }
    });

    const showcase = await prisma.showcase.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleFr: data.titleFr,
        artistName: data.artistName,
        mediumEn: data.mediumEn,
        mediumFr: data.mediumFr,
        seriesEn: data.seriesEn || '',
        seriesFr: data.seriesFr || '',
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        monthYear: data.monthYear,
        galleryItems: data.galleryItems,
        imageUrl: data.imageUrl,
      }
    });

    // Handle image cleanup for removed items
    if (oldShowcase) {
      const oldItems = JSON.parse(oldShowcase.galleryItems);
      const newItems = JSON.parse(data.galleryItems);
      const oldUrls = oldItems.filter((i: any) => i.type === 'image').map((i: any) => i.url);
      const newUrls = newItems.filter((i: any) => i.type === 'image').map((i: any) => i.url);

      for (const url of oldUrls) {
        if (!newUrls.includes(url)) {
          await deleteStorageImage(url);
        }
      }

      // Cleanup main image if replaced
      if (oldShowcase.imageUrl && oldShowcase.imageUrl !== data.imageUrl) {
        await deleteStorageImage(oldShowcase.imageUrl);
      }
    }

    return NextResponse.json({ success: true, showcase });
  } catch (error) {
    console.error("Update showcase error:", error);
    return NextResponse.json({ success: false, error: "Failed to update showcase" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch showcase to get gallery items before deleting
    const showcase = await prisma.showcase.findUnique({
      where: { id },
      select: { galleryItems: true, imageUrl: true }
    });

    await prisma.showcase.delete({
      where: { id },
    });

    // Delete all local images in the gallery
    if (showcase?.galleryItems) {
      const items = JSON.parse(showcase.galleryItems);
      for (const item of items) {
        if (item.type === 'image' && item.url) {
          await deleteStorageImage(item.url);
        }
      }
    }

    // Delete main image
    if (showcase?.imageUrl) {
      await deleteStorageImage(showcase.imageUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete showcase error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete showcase" }, { status: 500 });
  }
}
