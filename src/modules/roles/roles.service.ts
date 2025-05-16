import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './create-role.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async delete(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
