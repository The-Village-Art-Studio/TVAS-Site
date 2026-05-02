import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate an ID from the name if not provided
    const id = data.id || data.name.toLowerCase().replace(/\s+/g, '-');
    
    const member = await prisma.member.create({
      data: {
        id,
        name: data.name,
        type: data.type,
        imageUrl: data.imageUrl,
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        socialLinks: data.socialLinks,
      }
    });

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error("Create member error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.code === 'P2002' ? 'A member with this name already exists' : 'Failed to create member' 
    }, { status: 500 });
  }
}
