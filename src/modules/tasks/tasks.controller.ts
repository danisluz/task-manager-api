import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

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
