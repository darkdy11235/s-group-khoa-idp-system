import { Body, Controller, Get, Param, HttpCode, Post, UseGuards, SetMetadata, Patch, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Management')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    @SetMetadata('permissions', ['read:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async find(): Promise<User[]> {
        return await this.userService.find();
    } 

    @Post()
    @HttpCode(200)
    @SetMetadata('permissions', ['create:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    @HttpCode(200)
    @SetMetadata('permissions', ['update:users'])
    @UseGuards( PermissionsGuard)
    @ApiBearerAuth('JWT-auth')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return await this.userService.updateUser(id, updateUserDto);
    }
}
