import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/modules/user/user.service';
import { AssignRolesToUserDto } from '../dto/assign-roles-to-user.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    // inject the UserService
    private readonly userService: UserService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    // check if the role already exists
    const roleExists = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (roleExists) {
      throw new ConflictException('Role already exists');
    }
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async find() {
    return await this.roleRepository.find();
  }

  async findById(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
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

  async getRolePermissions(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    return role.permissions;
  }

  async assignRolesToUser(assignRolesToUserDto: AssignRolesToUserDto) {
    const user = await this.userService.findById(assignRolesToUserDto.userId);
    // get user roles
    const userRoles = await this.userService.getUserRoles(user.id);
    // get new roles
    const roles = await this.roleRepository.findBy({
      id: In(assignRolesToUserDto.roleIds),
    });
    // add new roles to the user
    user.roles = [...userRoles, ...roles];
    return await this.userService.update(
      assignRolesToUserDto.userId,
      user as any,
    );
  }

  async removeRolesFromUser(removeRolesFromUserDto: AssignRolesToUserDto) {
    const user = await this.userService.findById(removeRolesFromUserDto.userId);
    // get user roles
    const userRoles = await this.userService.getUserRoles(user.id);
    // get roles to remove
    const roles = await this.roleRepository.findBy({
      id: In(removeRolesFromUserDto.roleIds),
    });
    // remove roles in userRoles that are in roles
    user.roles = userRoles.filter(
      (userRole) => !roles.some((role) => role.name === userRole.name),
    );
    const updatedUser = await this.userService.update(
      removeRolesFromUserDto.userId,
      user as any,
    );
    // return the user without the password
    const { password, ...result } = updatedUser;
    return result;
  }
}
