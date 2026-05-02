import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate an ID from title if not provided
    const id = data.id || data.titleEn.toLowerCase().replace(/\s+/g, '-');
    
    const showcase = await prisma.showcase.create({
      data: {
        id,
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
  } catch (error: any) {
    console.error("Create showcase error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.code === 'P2002' ? 'A showcase with this title already exists' : 'Failed to create showcase' 
    }, { status: 500 });
  }
}
