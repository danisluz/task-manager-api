import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Pegando dados do arquivo .env
  const email = process.env.SUPERUSER_EMAIL || 'admin@system.com';
  const password = process.env.SUPERUSER_PASSWORD || '123456';

  // Criptografando a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criando ou atualizando o usuário administrador
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Super Admin',
      email,
      password: hashedPassword,
    },
  });

  console.log(`Usuário principal criado/atualizado: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
