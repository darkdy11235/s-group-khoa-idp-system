import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>) { }

    async create(createUserDto: CreateUserDto) {
        // check if the user already exists
        const userExists = await this.userRepository.findOne({ where: { username: createUserDto.username } });
        if (userExists) {
            throw new ConflictException('User already exists');
        }
        return await this.userRepository.save(createUserDto);
    }

    async find() {
        return await this.userRepository.find();
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        return user ? user : null;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getUserRoles(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.roles;
    }

    async update(userId: string, updateUserDto: CreateUserDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.save({ ...user, ...updateUserDto });
    }

    async delete(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.remove(user);
    }

    async profile(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }

    async getUserPermissions(userId: string) {
        try {
            // Find the user by userId along with their roles
            const user = await this.userRepository.findOne({ 
                where: { id: userId }, 
                relations: ['roles'] 
            });

            // Throw NotFoundException if user is not found
            if (!user) {
                throw new NotFoundException('User not found');
            }

            // Extract role ids from user's roles
            const roleIds = user.roles.map(role => role.id);

            // Fetch permissions associated with each role
            const permissions = await Promise.all(
                roleIds.map(async roleId => {
                    const role = await this.roleRepository.findOne({
                        where: { id: roleId },
                        relations: ['permissions']
                    });
                    return role.permissions.map(permission => permission.name);
                }
            ));

            // Flatten the permissions array
            const userPermissions = permissions.flat();
            console.log('User permissions:', userPermissions);
            // Return the user's permissions
            return userPermissions;
        } catch (error) {
            // Catch and handle any errors
            console.error('Error fetching user permissions:', error);
            throw new NotFoundException('User not found');
        }
    }

}
