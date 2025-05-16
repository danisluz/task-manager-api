import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Dados para criação da tarefa',
    schema: {
      example: {
        title: 'Título da Terafa',
        description: 'Descrição da tarefa',
        done: false,
        userId: 'UUID do usuário que pertence essa tarefa'
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Body('userId') userId: string) {
    return await this.tasksService.findByUser(userId);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return await this.tasksService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
