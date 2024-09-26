import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.upsert({
    where: {
      email: 'admin@test.com',
    },
    update: {},
    create: {
      email: 'admin@test.com',
      role: 'SUPER',
      Course: {
        create: {
          title: 'FullStack Dev',
          desc: 'smt...',
          price: 9.99,
          thumbnail: 'default.png',
          tags: 'web, TS, JS, Backend, Devops, Docker, Kubernetes, Realtime, Postgres, Memcached, Next',
        },
      },
    },
  });

  const c = await prisma.course.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      title: 'test',
      desc: 'test',
      price: 500.5,
      thumbnail: 'default.png',
      tags: 'test, test, web',
      creatorId: admin.id,
    },
  });

  const u1 = await prisma.user.upsert({
    where: {
      email: 'test@test.com',
    },
    update: {},
    create: {
      email: 'test@test.com',
      password: 'pwd',
      Purchase: {
        create: {
          courseId: 2,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
