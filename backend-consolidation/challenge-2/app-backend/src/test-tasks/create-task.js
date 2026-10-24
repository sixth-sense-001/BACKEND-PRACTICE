import prisma from '../lib/prismaClient.js';

try {
    try {
        await prisma.$connect();
        console.log('Postgresql successfully connected');
    } catch ( error ) {
        console.log('Postgresql failed to connect');
    }
    const task = await prisma.task.create({
        data: {
            title: "Software Architecture: The Hard Parts",
            description: "Modern Trade-Off Analyses for Distributed Architectures",
            priority: 'High',
            status: 'Pending',
            userId: 8
        }
    });
    console.log('Task successfully created');
    console.log(`Task details:`);
    console.log(task);
} catch ( error ) {
    console.log(`Database operation failed.\n ${error}`);
} finally {
    await prisma.$disconnect();
    console.log('Postgresql disconnected');
}