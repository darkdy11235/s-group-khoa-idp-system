import { Controller, Get, Post, Patch, Delete, Body, UseGuards, SetMetadata, Param } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { AuthGuard } from '../guards/auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('permissions')
  @SetMetadata('permissions', ['View access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async getPermissions(): Promise<Permission[]> {
    return this.permissionService.find();
  }

  @Post('')
  @SetMetadata('permissions', ['Edit access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Post('assign-permissions-to-role')
  @SetMetadata('permissions', ['Edit access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async assignPermissionsToRole(@Body() assignPermissionsToRoleDto: AssignPermissionsToRoleDto): Promise<any> {
    return this.permissionService.assignPermissionsToRole(assignPermissionsToRoleDto);
  }

  @Post('remove-permissions-from-role')
  @SetMetadata('permissions', ['Edit access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async removePermissionsFromRole(@Body() removePermissionsFromRoleDto: AssignPermissionsToRoleDto): Promise<any> {
    return this.permissionService.removePermissionsFromRole(removePermissionsFromRoleDto);
  }
  
  @Delete('/:id')
  @SetMetadata('permissions', ['Edit access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async removePermission(@Param('id') id: number): Promise<any> {
    return this.permissionService.remove(id);
  }

  @Get('/:id')
  @SetMetadata('permissions', ['View access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async getPermission(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Patch('/:id')
  @SetMetadata('permissions', ['Edit access rights'])
  @UseGuards( AuthGuard, PermissionsGuard)
  async updatePermission(@Param('id') id: number, @Body() updatePermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }
}