import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
const dbPath = databaseUrl.startsWith('file:')
  ? path.resolve(__dirname, databaseUrl.slice('file:'.length))
  : databaseUrl;

const adapter = new PrismaBetterSQLite3({
  url: dbPath,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
