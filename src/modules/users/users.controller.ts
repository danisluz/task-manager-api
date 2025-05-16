import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string
  ) {
    if (!id) {
      throw new Error('ID não fornecido');
    }
    return await this.usersService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ) {
    return await this.usersService.updateUser(id, dto);
  }
}
