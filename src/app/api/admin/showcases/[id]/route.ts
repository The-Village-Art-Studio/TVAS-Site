import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
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
      }
    });

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
    await prisma.showcase.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete showcase error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete showcase" }, { status: 500 });
  }
}
