import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: [
        { eventDate: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        titleEn: body.titleEn,
        titleFr: body.titleFr,
        descriptionEn: body.descriptionEn,
        descriptionFr: body.descriptionFr,
        dateEn: body.dateEn || "",
        dateFr: body.dateFr || "",
        eventDate: body.eventDate || "",
        locationEn: body.locationEn || "La Gloria Mexican Coffee, Toronto",
        locationFr: body.locationFr || "La Gloria Mexican Coffee, Toronto",
        capacityEn: body.capacityEn || "Limited to 8-12 guests",
        capacityFr: body.capacityFr || "Limité à 8-12 invités",
        durationEn: body.durationEn || "2.5 - 3 hours",
        durationFr: body.durationFr || "2.5 - 3 heures",
        imageUrl: body.imageUrl,
        link: body.link
      }
    });
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}
