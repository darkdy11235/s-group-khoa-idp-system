import { Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RoleService } from 'src/modules/auth/services/role.service';

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

  async update(id: number, updatePermissionDto: Permission) {
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

  async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
    const role = await this.roleService.findById(roleId);
    const permissions = await Promise.all(
      permissionIds.map((permissionId) =>
        this.permissionRepository.findOne({ where: { id: permissionId } }),
      ),
    );
    role.permissions = permissions;
    return await this.roleService.update(roleId, role);
  }

  async removePermissionsFromRole(roleId: number, permissionIds: number[]) {
    const role = await this.roleService.findById(roleId);
    role.permissions = role.permissions.filter(
      (permission) => !permissionIds.includes(permission.id),
    );
    return await this.roleService.update(roleId, role);
  }
}