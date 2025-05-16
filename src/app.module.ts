import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { TasksModule } from './modules/tasks/tasks.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [UsersModule, PrismaModule, TasksModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
