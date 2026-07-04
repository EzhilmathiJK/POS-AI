import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Prevent multiple instances of Prisma Client in development
// which can exhaust the database connection limit
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prisma;
}

export default prisma;
