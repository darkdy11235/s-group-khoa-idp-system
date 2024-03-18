import { Controller, Get, Post, Patch, Delete, Body, UseGuards, SetMetadata, Param } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { Auth} from '../decorators/auth.decorator';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('permissions')
  @Auth('View access rights')
  async getPermissions(): Promise<Permission[]> {
    return this.permissionService.find();
  }

  @Post('')
  @Auth('Edit access rights')
  async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Post('assign-permissions-to-role')
  @Auth('Edit access rights')
  async assignPermissionsToRole(@Body() assignPermissionsToRoleDto: AssignPermissionsToRoleDto): Promise<any> {
    return this.permissionService.assignPermissionsToRole(assignPermissionsToRoleDto);
  }

  @Post('remove-permissions-from-role')
  @Auth('Edit access rights')
  async removePermissionsFromRole(@Body() removePermissionsFromRoleDto: AssignPermissionsToRoleDto): Promise<any> {
    return this.permissionService.removePermissionsFromRole(removePermissionsFromRoleDto);
  }
  
  @Delete('/:id')
  @Auth('Edit access rights')
  async removePermission(@Param('id') id: number): Promise<any> {
    return this.permissionService.remove(id);
  }

  @Get('/:id')
  @Auth('View access rights')
  async getPermission(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Patch('/:id')
  @Auth('Edit access rights')
  async updatePermission(@Param('id') id: number, @Body() updatePermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }
}