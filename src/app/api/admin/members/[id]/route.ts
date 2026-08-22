import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteStorageImage } from '@/lib/image-utils';
import { randomUUID } from 'node:crypto';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const isPublished = data.intent === 'publish';

    if (isPublished && (!data.name || !data.imageUrl || !data.statementEn || !data.statementFr)) {
      return NextResponse.json({ success: false, error: 'Name, image, and both statements are required to publish' }, { status: 400 });
    }
    
    // Fetch existing member to check for old image
    const oldMember = await prisma.member.findUnique({
      where: { id },
      select: { imageUrl: true, previewToken: true }
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
        isPublished,
        previewToken: oldMember?.previewToken || randomUUID(),
      }
    });

    // If image changed, delete old one
    if (oldMember && oldMember.imageUrl !== data.imageUrl) {
      await deleteStorageImage(oldMember.imageUrl);
    }

    return NextResponse.json({ success: true, member, previewPath: `/members/${member.id}?preview=${member.previewToken}` });
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
      await deleteStorageImage(member.imageUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 });
  }
}
