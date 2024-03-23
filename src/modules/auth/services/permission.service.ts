import { Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RoleService } from 'src/modules/auth/services/role.service';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly roleService: RoleService,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async find() {
    return await this.permissionRepository.find();
  }

  async findById(id: number) {
    return await this.permissionRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePermissionDto: CreatePermissionDto) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException();
    }
    Object.assign(permission, updatePermissionDto);

    return await this.permissionRepository.save(permission);
  }

  async remove(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException();
    }
    return await this.permissionRepository.remove(permission);
  }

  async assignPermissionsToRole(
    assignPermissionsToRoleDto: AssignPermissionsToRoleDto,
  ) {
    const role = await this.roleService.findById(
      assignPermissionsToRoleDto.roleId,
    );
    // get role permissions
    const rolePermissions = await this.roleService.getRolePermissions(role.id);
    // get new permissions
    const permissions = await this.permissionRepository.findBy({
      id: In(assignPermissionsToRoleDto.permissionIds),
    });
    // add new permissions to the role
    role.permissions = [...rolePermissions, ...permissions];
    return await this.roleService.update(
      assignPermissionsToRoleDto.roleId,
      role,
    );
  }

  async removePermissionsFromRole(
    removePermissionsFromRoleDto: AssignPermissionsToRoleDto,
  ) {
    const role = await this.roleService.findById(
      removePermissionsFromRoleDto.roleId,
    );
    // get role permissions
    const rolePermissions = await this.roleService.getRolePermissions(role.id);
    console.log(rolePermissions);
    // get permissions to remove
    const permissions = await this.permissionRepository.findBy({
      id: In(removePermissionsFromRoleDto.permissionIds),
    });
    console.log(permissions);
    // remove permission in rolePermissions that are in permissions
    role.permissions = rolePermissions.filter(
      (rolePermission) =>
        !permissions.some(
          (permission) => permission.name === rolePermission.name,
        ),
    );
    console.log(role.permissions);
    return await this.roleService.update(
      removePermissionsFromRoleDto.roleId,
      role,
    );
  }
}
