import prisma from './lib/prismaClient.js';

try {
    await prisma.$connect();
    console.log(`Postgresql connected.`);
    const user = await prisma.user.update({
        where: {
            id: 7
        },
        data: {
            username: 'user_bright'
        }
    });
    console.log('Database operation successful');
    console.log(user);
} catch ( error ) {
    console.log(`Database operation failed \n ${error}`);
} finally {
    await prisma.$disconnect();
    console.log(`Postgresql disconnected.`);
}