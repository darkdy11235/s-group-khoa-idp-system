import { Controller, Post, SetMetadata, UseGuards, Body, Get } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { ApiTags } from "@nestjs/swagger";
import { CreatePermissionDto } from "../dto/create-permission.dto";

import { Permission } from "../entities/permission.entity";
import { AuthGuard } from "../guards/auth.guard";
import { PermissionsGuard } from "../guards/permissions.guard";
import { CreateRoleDto } from "../dto/create-role.dto";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post('')
    @SetMetadata('permissions', ['Edit access rights'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async createRole(@Body() CreateRoleDto: CreateRoleDto): Promise<any> {
        return this.roleService.create(CreateRoleDto);
    }

    @Get('roles')
    @SetMetadata('permissions', ['View access rights'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async getRoles(): Promise<any> {
        return this.roleService.find();
    }

    @Get('/:id')
    @SetMetadata('permissions', ['View access rights'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async getRole(@Body() id: number): Promise<any> {
        return this.roleService.findById(id);
    }

    @Post('assign-roles-to-user')
    @SetMetadata('permissions', ['Edit access rights'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async assignRolesToUser(@Body() assignRolesToUserDto: any): Promise<any> {
        return this.roleService.assignRolesToUser(assignRolesToUserDto);
    }

    @Post('remove-roles-from-user')
    @SetMetadata('permissions', ['Edit access rights'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async removeRolesFromUser(@Body() removeRolesFromUserDto: any): Promise<any> {
        return this.roleService.removeRolesFromUser(removeRolesFromUserDto);
    }

}