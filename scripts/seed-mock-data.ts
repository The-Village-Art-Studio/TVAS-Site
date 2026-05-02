import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock data into database...');

  // 1. Seed Podcasts
  const podcastData = [
    {
      titleEn: "Finding Your Voice Through Texture",
      titleFr: "Trouver sa voix à travers la texture",
      artist: "Maria Santos",
      descriptionEn: "Maria talks about growing up between two cultures and how that tension became the foundation of her tactile, layered textile work.",
      descriptionFr: "Maria parle d'avoir grandi entre deux cultures et comment cette tension est devenue la base de son travail textile tactile et superposé.",
      youtubeId: "dQw4w9WgXcQ",
      imageUrl: "/podcast-cover.png"
    },
    {
      titleEn: "The Mural as Community Memory",
      titleFr: "La murale comme mémoire communautaire",
      artist: "Daniel Osei",
      descriptionEn: "Daniel reflects on two decades of transforming public walls into community narratives across Toronto neighbourhoods.",
      descriptionFr: "Daniel réfléchit sur deux décennies de transformation de murs publics en récits communautaires à travers les quartiers de Toronto.",
      youtubeId: "dQw4w9WgXcQ",
      imageUrl: "/podcast-cover.png"
    },
    {
      titleEn: "Ceramics and the Slow Practice",
      titleFr: "La céramique et la pratique lente",
      artist: "Yuki Tanaka",
      descriptionEn: "In a culture of instant gratification, Yuki makes the case for slowness — and how clay taught her to stop performing and start creating.",
      descriptionFr: "Dans une culture de gratification instantanée, Yuki plaide pour la lenteur — et comment l'argile lui a appris à cesser de performer pour commencer à créer.",
      youtubeId: "dQw4w9WgXcQ",
      imageUrl: "/podcast-cover.png"
    }
  ];

  for (const podcast of podcastData) {
    await prisma.podcast.create({ data: podcast });
  }

  // 2. Seed Showcases
  const showcaseData = [
    {
      titleEn: "Featured Artist Name",
      titleFr: "Nom de l'artiste vedette",
      artistName: "Featured Artist",
      mediumEn: "Mixed Media",
      mediumFr: "Technique Mixte",
      seriesEn: "Current Series",
      seriesFr: "Série Actuelle",
      statementEn: "A detailed exploration of this month's featured artist...",
      statementFr: "Une exploration détaillée de l'artiste vedette de ce mois-ci...",
      monthYear: "April 2025",
      galleryItems: JSON.stringify([
        { type: "image", url: "/featured-artist-placeholder.png" }
      ])
    },
    {
      titleEn: "Priya Nair",
      titleFr: "Priya Nair",
      artistName: "Priya Nair",
      mediumEn: "Photography",
      mediumFr: "Photographie",
      seriesEn: "Vol. 3",
      seriesFr: "Vol. 3",
      statementEn: "Photography exploration.",
      statementFr: "Exploration photographique.",
      monthYear: "March 2025",
      galleryItems: JSON.stringify([])
    },
    {
      titleEn: "Jerome Williams",
      titleFr: "Jerome Williams",
      artistName: "Jerome Williams",
      mediumEn: "Mixed Media",
      mediumFr: "Technique Mixte",
      seriesEn: "Vol. 2",
      seriesFr: "Vol. 2",
      statementEn: "Mixed media creations.",
      statementFr: "Créations en technique mixte.",
      monthYear: "February 2025",
      galleryItems: JSON.stringify([])
    },
    {
      titleEn: "Sofia Reyes",
      titleFr: "Sofia Reyes",
      artistName: "Sofia Reyes",
      mediumEn: "Watercolour",
      mediumFr: "Aquarelle",
      seriesEn: "Vol. 1",
      seriesFr: "Vol. 1",
      statementEn: "Watercolour paintings.",
      statementFr: "Peintures à l'aquarelle.",
      monthYear: "January 2025",
      galleryItems: JSON.stringify([])
    }
  ];

  for (const showcase of showcaseData) {
    await prisma.showcase.create({ data: showcase });
  }

  // 3. Seed Events
  const eventData = [
    {
      titleEn: "Portrait Drawing With a Local Painter",
      titleFr: "Dessin de portrait avec un peintre local",
      descriptionEn: "A guided portrait drawing experience led by a local painter. No experience required — just curiosity and a willingness to see.",
      descriptionFr: "Une expérience de dessin de portrait guidée animée par un peintre local. Aucune expérience requise.",
      imageUrl: "/la_gloria_workshop_1776084783262.png",
      link: "/contact"
    },
    {
      titleEn: "Printmaking & Coffee Morning",
      titleFr: "Gravure et matin café",
      descriptionEn: "An introduction to the meditative world of printmaking, hosted by a Toronto printmaker over a La Gloria morning brew.",
      descriptionFr: "Une introduction au monde méditatif de la gravure, animée par un graveur de Toronto.",
      imageUrl: "/la_gloria_workshop_1776084783262.png",
      link: "/contact"
    },
    {
      titleEn: "Watercolour & Conversation",
      titleFr: "Aquarelle et conversation",
      descriptionEn: "A relaxed watercolour afternoon where you paint, talk with the artist, and leave with both a piece of art and a new perspective.",
      descriptionFr: "Un après-midi détendu à l'aquarelle où vous peignez, parlez avec l'artiste et repartez avec une œuvre d'art.",
      imageUrl: "/la_gloria_workshop_1776084783262.png",
      link: "/contact"
    }
  ];

  for (const event of eventData) {
    await prisma.event.create({ data: event });
  }

  console.log('Seeding complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
