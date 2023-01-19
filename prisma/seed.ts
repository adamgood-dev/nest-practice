import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where: { username : 'johndoe' },
        update: {},
        create: {
            username: 'johndoe',
            email: 'johndoe1@default.com',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { username : 'adamgood' },
        update: {},
        create: {
            username: 'adamgood',
            email: 'adam@notmyemail.net',
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })