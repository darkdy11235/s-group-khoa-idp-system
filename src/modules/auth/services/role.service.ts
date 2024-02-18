import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>
	) {}
	async create(createRoleDto: CreateRoleDto) {
		// check if the role already exists
        const roleExists = await this.roleRepository.findOne({ where: { name: createRoleDto.name } });
        if (roleExists) {
            throw new ConflictException('Role already exists');
        }
        const role = this.roleRepository.create(createRoleDto);
		return await this.roleRepository.save(role);
	}

    async find() {
        return await this.roleRepository.find();
    }

    async findOne(id: number) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async update(id: number, updateRoleDto: CreateRoleDto) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return await this.roleRepository.save({ ...role, ...updateRoleDto });
    }

    async delete(id: number) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return await this.roleRepository.remove(role);
    }

    async getRolePermissions(roles : Role[]) {
        const roleIds = roles.map(role => role.id);
        const permissions = await this.roleRepository.createQueryBuilder('role')
            .leftJoinAndSelect('role.permissions', 'permission')
            .where('role.id IN (:...roleIds)', { roleIds })
            .getMany();
        return permissions.map(permission => permission.name);
    }
}