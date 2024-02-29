import { Body, Controller, Get, Param, HttpCode, Post, Delete, UseGuards, SetMetadata, Patch, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard, PermissionsGuard } from '../auth/guards';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @Post()
    @HttpCode(200)
    @SetMetadata('permissions', ['Edit member user'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get('users')
    @HttpCode(200)
    @UseGuards( AuthGuard, PermissionsGuard )
    @SetMetadata('permissions', ['View users'])
    async find(): Promise<any> {
        return await this.userService.find();
    }

    @Patch(':id')
    @HttpCode(200)
    @SetMetadata('permissions', ['Edit member user'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise <any> {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @SetMetadata('permissions', ['Edit member user'])
    @UseGuards( AuthGuard, PermissionsGuard)
    async removeUser(@Param('id') id: string): Promise<any> {
        return await this.userService.delete(id);
    }

    @Get('profile')
    @HttpCode(200)
    @UseGuards( AuthGuard)
    async profile(): Promise<any> {
        return { message: 'Profile' };
    }
}
