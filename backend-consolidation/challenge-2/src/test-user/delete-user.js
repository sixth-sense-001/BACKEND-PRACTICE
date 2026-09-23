import prisma from '../lib/prismaClient.js';
try {
    await prisma.$connect();
    const user = await prisma.user.delete({
        where: {
            username: 'bright'
        }
    });
    console.log(`Deleted the user with these credentials \n ${user}`);
} catch (error) {
    console.log(`Database operation failed \n ${error}`);
} finally {
    console.log('Postgresql disconnected');
    await prisma.$disconnect();
}