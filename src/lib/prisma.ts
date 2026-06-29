import { PrismaClient } from '@prisma/client'

// Standard PrismaClient singleton for PostgreSQL (Supabase)
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobalV12: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobalV12 ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobalV12 = prisma
