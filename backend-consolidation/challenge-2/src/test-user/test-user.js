import prisma from '../lib/prismaClient.js';

try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
    const users = await prisma.user.findMany();
    console.log(users);
} catch(error) {
} finally {
    await prisma.$disconnect();
}