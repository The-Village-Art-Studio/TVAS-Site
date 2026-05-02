import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// Set the environment variable explicitly for Prisma's internal engine
process.env.DATABASE_URL = 'file:/Users/jackyho/Documents/GitHub/TVAS-Site/dev.db';

const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL!;
  console.error("PRISMA INITIALIZING V11 WITH:", dbUrl);
  
  const libsql = createClient({
    url: dbUrl,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobalV11: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobalV11 ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobalV11 = prisma
