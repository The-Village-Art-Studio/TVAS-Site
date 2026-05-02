import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const member = await prisma.member.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, member });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch member" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
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
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Member update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Member deletion error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 });
  }
}
