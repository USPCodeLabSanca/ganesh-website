/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

export const prisma = (global as any).prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}
