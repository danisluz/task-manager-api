import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // Criar uma Role
  async createRole(name: string) {
    return await this.prisma.role.create({
      data: { name },
    });
  }

  // Listar todas as Roles
  async getRoles() {
    try {
      return await this.prisma.role.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar roles:', error.message);
      throw new Error('Erro ao buscar roles');
    }
  }

  // Criar um Grupo de Usuário
  async createUserGroup(name: string) {
    return await this.prisma.userGroup.create({
      data: { name },
    });
  }

  // Listar todos os Grupos de Usuários
  async getUserGroups() {
    return await this.prisma.userGroup.findMany();
  }

  // Atribuir uma Role a um Usuário
  async assignRoleToUser(userId: string, roleId: string) {
    try {
      return await this.prisma.userRole.create({
        data: {
          userId,
          roleId,
        },
      });
    } catch (error) {
      console.error('Erro ao atribuir role ao usuário:', error);
      throw error;
    }
  }

  // Atribuir um Grupo a um Usuário
  async assignUserToGroup(userId: string, groupId: string) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          userGroups: {
            connect: { id: groupId },
          },
        },
      });
    } catch (error) {
      console.error('Erro ao atribuir grupo ao usuário:', error);
      throw error;
    }
  }

  // Listar Usuários com suas Roles
  async getUsersWithRoles() {
    return await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  // Listar Usuários com seus Grupos
  async getUsersWithGroups() {
    return await this.prisma.user.findMany({
      include: {
        userGroups: true,
      },
    });
  }
}
