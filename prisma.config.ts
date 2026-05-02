// @ts-nocheck — Prisma 6 config: 'prisma/config' types are not exposed in package exports
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "file:/Users/jackyho/Documents/GitHub/TVAS-Site/dev.db",
  },
});
