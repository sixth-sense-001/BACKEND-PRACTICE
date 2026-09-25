import prisma from '../lib/prismaClient.js';

try {
    try {
        await prisma.$connect();
        console.log('Postgresql successfully connected');
    } catch ( error ) {
        console.log(`Postgresql failed to connect \n ${error}`)
    }
    const task = await prisma.task.delete({
        where: {
            id: 2
        }
    }); 
    console.log('Task deleted successfully');
    console.log(task);
} catch ( error ) {
    console.log(`Database operation failed \n ${error}`);
} finally {
    await prisma.$disconnect();
    console.log('Postgresql disconnected');
}