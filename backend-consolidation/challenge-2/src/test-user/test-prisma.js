import prisma from '../lib/prismaClient.js';

try {
    await prisma.$connect();
    console.log('Prisma is running successfully');
} catch(error) {
    console.log('Prisma failed to connect!');
} finally {
    await prisma.$disconnect();
}