import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteLocalImage } from '@/lib/image-utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Fetch existing member to check for old image
    const oldMember = await prisma.member.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

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

    // If image changed, delete old one
    if (oldMember && oldMember.imageUrl !== data.imageUrl) {
      await deleteLocalImage(oldMember.imageUrl);
    }

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
    
    // Fetch member to get image URL before deleting
    const member = await prisma.member.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

    await prisma.member.delete({
      where: { id },
    });

    // Delete image if it exists
    if (member?.imageUrl) {
      await deleteLocalImage(member.imageUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 });
  }
}
