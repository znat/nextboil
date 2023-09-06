import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const org1 = await prisma.organization.create({
        data: {
            name: 'Organization 1',
            users: {
                create: [
                    {
                        email: 'user1@org1.com',
                        emailVerified: new Date(),
                        role: Role.ORG_ADMIN,
                        profile: {
                            create: {
                                firstName: 'User 1',
                                lastName: 'Org 1',
                            },
                        },
                    },
                    {
                        email: 'user2@org1.com',
                        emailVerified: new Date(),
                        role: Role.ORG_USER,
                        profile: {
                            create: {
                                firstName: 'User 2',
                                lastName: 'Org 1',
                            },
                        },
                    },
                ],
            },
        },
    });

    const org2 = await prisma.organization.create({
        data: {
            name: 'Organization 2',
            users: {
                create: [
                    {
                        email: 'user1@org2.com',
                        emailVerified: new Date(),
                        role: Role.ORG_ADMIN,
                        profile: {
                            create: {
                                firstName: 'User 1',
                                lastName: 'Org 2',
                            },
                        },
                    },
                    {
                        email: 'user2@org2.com',
                        emailVerified: new Date(),
                        role: Role.ORG_USER,
                        profile: {
                            create: {
                                firstName: 'User 2',
                                lastName: 'Org 2',
                            },
                        },
                    },
                ],
            },
        },
    });

    const org3 = await prisma.organization.create({
        data: {
            name: 'Organization 3',
            users: {
                create: [
                    {
                        email: 'user1@org3.com',
                        emailVerified: new Date(),
                        role: Role.ORG_ADMIN,
                        profile: {
                            create: {
                                firstName: 'User 1',
                                lastName: 'Org 3',
                            },
                        },
                    },
                    {
                        email: 'user2@org3.com',
                        emailVerified: new Date(),
                        role: Role.ORG_USER,
                        profile: {
                            create: {
                                firstName: 'User 2',
                                lastName: 'Org 3',
                            },
                        },
                    },
                ],
            },
        },
    });

    console.log(
        `Created organizations: ${org1.name}, ${org2.name}, ${org3.name}`
    );
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
