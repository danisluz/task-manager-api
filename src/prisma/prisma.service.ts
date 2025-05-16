import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      console.log('📦 Conectado ao banco de dados');
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      console.log('❌ Desconectado do banco de dados');
    } catch (error) {
      console.error('⚠️ Erro ao desconectar:', error);
    }
  }
}
