import {PrismaClient} from '../generated/prisma/client.ts';
import {PrismaPg} from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname,'../../.env')
});

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({adapter});

export default prisma;