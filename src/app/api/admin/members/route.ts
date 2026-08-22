import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { randomUUID } from 'node:crypto';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const isPublished = data.intent === 'publish';

    if (isPublished && (!data.name || !data.imageUrl || !data.statementEn || !data.statementFr)) {
      return NextResponse.json({ success: false, error: 'Name, image, and both statements are required to publish' }, { status: 400 });
    }
    
    // Generate an ID from the name if not provided
    const id = data.id || data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || randomUUID();
    
    const member = await prisma.member.create({
      data: {
        id,
        name: data.name,
        type: data.type,
        imageUrl: data.imageUrl,
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        socialLinks: data.socialLinks,
        isPublished,
        previewToken: randomUUID(),
      }
    });

    return NextResponse.json({ success: true, member, previewPath: `/members/${member.id}?preview=${member.previewToken}` });
  } catch (error: unknown) {
    console.error("Create member error:", error);
    const isDuplicate = typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
    return NextResponse.json({ 
      success: false, 
      error: isDuplicate ? 'A member with this name already exists' : 'Failed to create member'
    }, { status: 500 });
  }
}
