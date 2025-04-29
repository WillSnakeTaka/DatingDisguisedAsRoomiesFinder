// utils/prisma.ts
import { PrismaClient } from '@prisma/client';

// Single instance of Prisma Client for reuse
const prisma = new PrismaClient();

// Export the instance
export { prisma };
