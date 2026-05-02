import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const showcase = await prisma.showcase.create({
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
    console.error("Showcase creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create showcase" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const showcases = await prisma.showcase.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, showcases });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch showcases" }, { status: 500 });
  }
}
