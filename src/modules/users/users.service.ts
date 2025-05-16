import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const { name, email, password, roleIds } = dto;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          roles: roleIds
            ? {
                create: roleIds.map((roleId) => ({
                  role: { connect: { id: roleId } },
                })),
              }
            : undefined,
        },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async deleteUser(userId: string) {
    try {

      if(!userId) {
        throw new Error('ID do usuário não fornecido');
      }

      return await this.prisma.user.delete({
        where: { id: userId },
      });
    }catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
      throw new Error('Erro ao excluir usuário');
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const { name, email, password, roleIds } = dto;

    try {
      // Verificar se a senha foi informada e criptografá-la
      let hashedPassword: string | undefined;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Atualizar o usuário
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          password: hashedPassword,
          roles: roleIds?.length ? {
            deleteMany: {},
            create: roleIds.map((roleId) => ({
              role: { connect: { id: roleId } },
            })),
          } : undefined,
        },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });

      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
}
