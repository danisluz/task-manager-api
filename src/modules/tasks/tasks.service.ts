import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  async update(id: string, updateTaskDto: UpdateTaskDto) {

    if (!updateTaskDto || Object.keys(updateTaskDto).length === 0) {
      throw new Error('Nenhum dado fornecido para atualização');
    }

    const { title, description, done, userId } = updateTaskDto;

    const updateTask = await this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        done: done ?? false,
        userId
      }
    })

    return updateTask
  }

  async deleteTask(id: string) {
    try {
      if(!id){
        throw new Error('Id da task nao fornecida');
      }

      return await this.prisma.task.delete({
        where: { id },
      });
    }catch (error) {
      console.error('Error deletar task', error.message);
      throw new Error('Erro ao deletar a task');
    }
  }
}
