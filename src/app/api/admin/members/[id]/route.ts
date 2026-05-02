import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const member = await prisma.member.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        imageUrl: data.imageUrl,
        statementEn: data.statementEn,
        statementFr: data.statementFr,
        socialLinks: data.socialLinks,
      }
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Update member error:", error);
    return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.member.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 });
  }
}
