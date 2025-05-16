import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService, PrismaService],
  controllers: [RolesController],
})
export class RolesModule {}