import prisma from '../lib/prismaClient.js';

try {
    try {
        await prisma.$connect();
        console.log('Postgresql successfully connected.');
    } catch ( error ) {
        console.log('Postgresql failed to connect')
    }
    const tasks = await prisma.task.findMany();
    console.log(tasks);
} catch ( error ) {
    console.log('Database operation failed');
} finally {
    await prisma.$disconnect();
    console.log('Postgresql disconnected');
}