import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// The DATABASE_URL is loaded automatically from .env

const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL!;
  console.error("PRISMA INITIALIZING V12 WITH:", dbUrl);
  
  const libsql = createClient({
    url: dbUrl,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobalV12: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobalV12 ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobalV12 = prisma
