import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const showcase = await prisma.showcase.findUnique({
      where: { id },
    });

    if (!showcase) {
      return NextResponse.json({ success: false, error: "Showcase not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, showcase });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch showcase" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await request.json();
    
    const showcase = await prisma.showcase.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleFr: data.titleFr,
        artistName: data.artistName,
        mediumEn: data.mediumEn,
        mediumFr: data.mediumFr,
        seriesEn: data.seriesEn,
        seriesFr: data.seriesFr,
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        monthYear: data.monthYear,
        galleryItems: data.galleryItems,
      },
    });

    return NextResponse.json({ success: true, showcase });
  } catch (error) {
    console.error("Showcase update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update showcase" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.showcase.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Showcase deletion error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete showcase" }, { status: 500 });
  }
}
