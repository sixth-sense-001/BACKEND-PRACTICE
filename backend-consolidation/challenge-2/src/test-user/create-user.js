import prisma from '../lib/prismaClient.js';

try {
    await prisma.$connect();
    console.log('Postgresql is connected successfully.');
    const user = await prisma.user.create({
        data: {
            username: 'test_user2',
            password: 'test@123'
        }
    });
    console.log(user);
} catch( error ) {
    console.log(`Postgresql failed to connect \n ${error}`);
} finally {
    await prisma.$disconnect();
}