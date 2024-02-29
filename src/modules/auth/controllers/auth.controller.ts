import { Body, Controller, Get, Param, HttpCode, Post, UseGuards, SetMetadata, Patch, NotFoundException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';
import { LoginDto } from '../dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Authentications')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly permissionService: PermissionService,
        private readonly roleService: RoleService
        ) {}
    
    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() createUserDto: any): Promise<any> {
        return await this.authService.register(createUserDto);
    }

    @Get('logout')
    @HttpCode(200)
    @UseGuards( AuthGuard)
    async logout(): Promise<any> {
        return await this.authService.logout();
    }
}
