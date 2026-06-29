import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteStorageImage } from '@/lib/image-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSetting.findUnique({
        where: { key }
      });
      return NextResponse.json({ success: true, value: setting?.value || null });
    }

    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json({ success: false, error: "Key is required" }, { status: 400 });
    }

    // Check for old value to delete old image if it's a cover image setting
    if (key.endsWith('_cover') || key.endsWith('_image')) {
      const oldSetting = await prisma.siteSetting.findUnique({
        where: { key }
      });
      if (oldSetting && oldSetting.value !== value) {
        await deleteStorageImage(oldSetting.value);
      }
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error("Save setting error:", error);
    return NextResponse.json({ success: false, error: "Failed to save setting" }, { status: 500 });
  }
}
