import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SUPERUSER_EMAIL || 'admin@system.com';
  const adminPassword = process.env.SUPERUSER_PASSWORD || '123456';

  // Verifica se a role ADMIN já existe
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Full system access',
    },
  });

  // Verifica se o grupo Administrators já existe
  const adminGroup = await prisma.group.upsert({
    where: { name: 'Administrators' },
    update: {},
    create: {
      name: 'Administrators',
      roles: {
        connect: [{ id: adminRole.id }],
      },
    },
  });

  // Verifica se o superusuário já existe
  const existingSuperUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingSuperUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Cria o superusuário
    const superUser = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
      },
    });

    // Vincula o superusuário ao grupo Administrators
    await prisma.userGroup.create({
      data: {
        userId: superUser.id,
        groupId: adminGroup.id,
      },
    });

    console.log(`✅ Superusuário criado com sucesso! Email: ${adminEmail}`);
  } else {
    console.log('⚠️ Superusuário já existe!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
