import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const member = await prisma.member.create({
      data: {
        name: data.name,
        type: data.type,
        imageUrl: data.imageUrl,
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        socialLinks: data.socialLinks,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Member creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create member" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, members });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch members" }, { status: 500 });
  }
}
