import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

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
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const permissions = user.roles.map(role => role.permissions).flat();
        return permissions.map(permission => permission.name);
    }
}
