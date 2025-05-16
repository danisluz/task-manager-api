import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignUserGroupDto } from './dto/assign-user-group.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto.name);
  }

  @Get()
  async getRoles() {
    return this.rolesService.getRoles();
  }

  @Post('group')
  async createUserGroup(@Body() dto: CreateUserGroupDto) {
    return this.rolesService.createUserGroup(dto.name);
  }

  @Get('groups')
  async getUserGroups() {
    return this.rolesService.getUserGroups();
  }

  @Post('assign-role')
  async assignRole(@Body() dto: AssignRoleDto) {
    return this.rolesService.assignRoleToUser(dto.userId, dto.roleId);
  }

  @Post('assign-group')
  async assignUserGroup(@Body() dto: AssignUserGroupDto) {
    return this.rolesService.assignUserToGroup(dto.userId, dto.groupId);
  }

  @Get('users-with-roles')
  async getUsersWithRoles() {
    return this.rolesService.getUsersWithRoles();
  }

  @Get('users-with-groups')
  async getUsersWithGroups() {
    return this.rolesService.getUsersWithGroups();
  }
}
