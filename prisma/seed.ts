import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Variáveis de ambiente para o superusuário
  const email = process.env.SUPERUSER_EMAIL || 'admin@system.com';
  const password = process.env.SUPERUSER_PASSWORD || '123456';

  // Hash da senha do superusuário
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar Roles Padrão
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  // Criar Grupo Padrão
  const adminGroup = await prisma.userGroup.upsert({
    where: { name: 'AdminGroup' },
    update: {},
    create: { name: 'AdminGroup' },
  });

  console.log('Roles e grupos criados com sucesso.');

  // Criar ou atualizar o superusuário
  const superUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Super Admin',
      email,
      password: hashedPassword,
      roles: {
        create: {
          role: {
            connect: { id: adminRole.id },
          },
        },
      },
      userGroups: {
        connect: { id: adminGroup.id },
      },
    },
  });

  console.log(`Superusuário criado/atualizado: ${superUser.email}`);
}

main()
  .catch((e) => {
    console.error('Erro ao criar o superusuário:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
