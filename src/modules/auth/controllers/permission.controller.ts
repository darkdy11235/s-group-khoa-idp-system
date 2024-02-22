import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';


@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'List of permissions', type: [Permission] })
  async getPermissions(): Promise<Permission[]> {
    return this.permissionService.getPermissions();
  }

  @Post('permissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Permission created', type: Permission })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.createPermission(createPermissionDto);
  }
}