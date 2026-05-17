import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id }
    });
    if (!event) return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("PUT request for event ID:", id);
  try {
    const body = await request.json();
    console.log("Request body:", body);
    
    const event = await prisma.event.update({
      where: { id },
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
    console.log("Event updated successfully:", event.id);
    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    console.error("Update event error:", error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update event', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.event.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}
