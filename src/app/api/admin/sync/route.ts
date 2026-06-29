import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/admin/sync
 * Seeds the database with mock data (for development/staging purposes).
 * Uses Prisma upsert so it is safe to run multiple times.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Members
    const mockMembers = [
      { id: 'elena-marchetti', name: 'Elena Marchetti', type: 'painter', imageUrl: '/artists/elena.png', statementEn: 'Elena is a contemporary painter specializing in abstract landscapes.', statementFr: "Elena est une peintre contemporaine spécialisée dans les paysages abstraits.", socialLinks: JSON.stringify({ website: '', instagram: 'elenamarchetti', twitter: '' }) },
      { id: 'daniel-osei', name: 'Daniel Osei', type: 'photographer', imageUrl: '/artists/daniel.png', statementEn: 'Daniel captures the vibrant life of city streets.', statementFr: 'Daniel capture la vie vibrante des rues de la ville.', socialLinks: JSON.stringify({ website: '', instagram: 'danielosei', twitter: '' }) },
      { id: 'maria-santos', name: 'Maria Santos', type: 'digital', imageUrl: '/artists/maria.png', statementEn: 'Maria explores the intersection of nature and technology.', statementFr: "Maria explore l'intersection de la nature et de la technologie.", socialLinks: JSON.stringify({ website: '', instagram: 'mariasantos', twitter: '' }) },
      { id: 'yuki-tanaka', name: 'Yuki Tanaka', type: 'sculptor', imageUrl: '/artists/yuki.png', statementEn: 'Yuki creates minimalist sculptures from recycled materials.', statementFr: 'Yuki crée des sculptures minimalistes à partir de matériaux recyclés.', socialLinks: JSON.stringify({ website: '', instagram: 'yukitanaka', twitter: '' }) },
      { id: 'amara-diallo', name: 'Amara Diallo', type: 'musician', imageUrl: '/artists/amara.png', statementEn: 'Amara is a multi-instrumentalist blending traditional sounds with modern beats.', statementFr: 'Amara est une multi-instrumentiste mélangeant des sons traditionnels avec des rythmes modernes.', socialLinks: JSON.stringify({ website: '', instagram: 'amaradiallo', twitter: '' }) },
      { id: 'julian-vance', name: 'Julian Vance', type: 'writer', imageUrl: '/artists/julian.png', statementEn: 'Julian writes evocative poetry about urban solitude.', statementFr: 'Julian écrit une poésie évocatrice sur la solitude urbaine.', socialLinks: JSON.stringify({ website: '', instagram: 'julianvance', twitter: '' }) },
      { id: 'sofia-reyes', name: 'Sofia Reyes', type: 'painter', imageUrl: '/artists/sofia.png', statementEn: 'Sofia uses bold colors to depict emotional landscapes.', statementFr: 'Sofia utilise des couleurs vives pour dépeindre des paysages émotionnels.', socialLinks: JSON.stringify({ website: '', instagram: 'sofiareyes', twitter: '' }) },
      { id: 'marcus-chen', name: 'Marcus Chen', type: 'photographer', imageUrl: '/artists/marcus.png', statementEn: 'Marcus documents the quiet moments of everyday life.', statementFr: 'Marcus documente les moments calmes de la vie quotidienne.', socialLinks: JSON.stringify({ website: '', instagram: 'marcuschen', twitter: '' }) },
    ];

    for (const m of mockMembers) {
      await prisma.member.upsert({
        where: { id: m.id },
        update: {},
        create: m,
      });
    }

    // 2. Showcases
    const mockShowcases = [
      {
        id: 'urban-solitude',
        artistName: 'Julian Vance',
        monthYear: 'April 2025',
        titleEn: 'Urban Solitude',
        titleFr: 'Solitude Urbaine',
        mediumEn: 'Digital Art',
        mediumFr: 'Art Numérique',
        seriesEn: 'Urban Dreams',
        seriesFr: 'Rêves Urbains',
        statementEn: 'A poetic exploration of the quiet moments in a bustling city.',
        statementFr: 'Une exploration poétique des moments de calme dans une ville animée.',
        galleryItems: JSON.stringify([
          { type: 'image', url: '/showcase/urban-1.jpg' },
          { type: 'image', url: '/showcase/urban-2.jpg' },
        ]),
      },
      {
        id: 'digital-nature',
        artistName: 'Maria Santos',
        monthYear: 'March 2025',
        titleEn: 'Digital Nature',
        titleFr: 'Nature Numérique',
        mediumEn: 'Oil on Canvas',
        mediumFr: 'Huile sur Toile',
        seriesEn: 'Eco-Futures',
        seriesFr: 'Éco-Futurs',
        statementEn: 'Where algorithms meet the organic world.',
        statementFr: 'Où les algorithmes rencontrent le monde organique.',
        galleryItems: JSON.stringify([
          { type: 'image', url: '/showcase/nature-1.jpg' },
        ]),
      },
    ];

    for (const s of mockShowcases) {
      await prisma.showcase.upsert({
        where: { id: s.id },
        update: {},
        create: s,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: 'Failed to sync data' }, { status: 500 });
  }
}
