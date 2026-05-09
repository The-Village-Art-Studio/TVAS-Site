import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate a slug-based ID, but append a small random string to ensure uniqueness
    // while keeping URLs relatively clean.
    const slug = data.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const id = data.id || `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    
    console.log("Creating showcase with data:", { ...data, id });

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
        imageUrl: data.imageUrl,
      }
    });

    return NextResponse.json({ success: true, showcase });
  } catch (error: any) {
    console.error("Create showcase error:", error);
    return NextResponse.json({ 
      success: false, 
      error: `Server Error: ${error.message || 'Unknown error'}`
    }, { status: 500 });
  }
}
