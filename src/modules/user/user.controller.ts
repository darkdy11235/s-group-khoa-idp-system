import { Body, Controller, Get, Param, HttpCode, Post, Delete, UseGuards, SetMetadata, Patch, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Management')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @Post()
    @HttpCode(200)
    @SetMetadata('permissions', ['create:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get('users')
    @HttpCode(200)
    async find(): Promise<User[]> {
        return await this.userService.find();
    }

    @Patch(':id')
    @HttpCode(200)
    @SetMetadata('permissions', ['update:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @SetMetadata('permissions', ['delete:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async removeUser(@Param('id') id: string): Promise<any> {
        return await this.userService.delete(id);
    }

    @Get('profile')
    @HttpCode(200)
    @SetMetadata('permissions', ['read:profile'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async profile(): Promise<any> {
        return { message: 'Profile' };
    }
}
