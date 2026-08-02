import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();

async function check() {
  const podcasts = await prisma.podcast.findMany({ orderBy: { createdAt: 'desc' } });
  console.log('=== ALL PODCASTS ===');
  podcasts.forEach(p => {
    console.log(`\nTitle: ${p.titleEn}`);
    console.log(`  imageUrl: ${p.imageUrl || '(empty)'}`);
    console.log(`  youtubeId: ${p.youtubeId}`);
    console.log(`  created: ${p.createdAt}`);
  });

  const showcases = await prisma.showcase.findMany({ orderBy: { createdAt: 'desc' } });
  console.log('\n=== ALL SHOWCASES ===');
  showcases.forEach(s => {
    console.log(`\nArtist: ${s.artistName}`);
    console.log(`  imageUrl: ${s.imageUrl || '(empty)'}`);
    console.log(`  galleryItems: ${s.galleryItems?.substring(0, 200) || '(empty)'}`);
  });

  const members = await prisma.member.findMany({ orderBy: { createdAt: 'desc' } });
  console.log('\n=== ALL MEMBERS ===');
  members.forEach(m => {
    console.log(`\nName: ${m.name}`);
    console.log(`  imageUrl: ${m.imageUrl || '(empty)'}`);
  });
}

check().catch(console.error).finally(() => prisma.$disconnect());
