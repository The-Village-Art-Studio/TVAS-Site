import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Testing connection to database...');
  console.log('DATABASE_URL is:', process.env.DATABASE_URL);
  
  try {
    const members = await prisma.member.findMany();
    console.log('✅ Connection successful!');
    console.log(`Found ${members.length} members.`);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
