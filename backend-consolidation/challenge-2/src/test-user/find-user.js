import prisma from './lib/prismaClient.js';

try {  
    await prisma.$connect();
    const user = await prisma.user.findUnique({
        where: {
            username: 'test_user5'
        }
    });
    console.log(user);
} catch( error ) {
    console.log(`Postgresql failed to connect \n ${error}`);
} finally {
    await prisma.$disconnect();
}