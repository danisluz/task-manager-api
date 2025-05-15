import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, description, done, userId } = createTaskDto;

    return await this.prisma.task.create({
      data: {
        title,
        description,
        done: done ?? false,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async findByUser(userId: string) {
    return await this.prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true,
      },
    });
  }
}
