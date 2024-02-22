import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { PermissionService } from 'src/modules/auth/services/permission.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { RoleService } from './role.service';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private readonly UserService: UserService,
		private readonly PermissionService: PermissionService,
        private readonly RoleService: RoleService,
	) {}

async register(createUserDto: any): Promise<any> {
    const user = await this.UserService.findByUsername(createUserDto.username);
    if (user) {
        throw new NotAcceptableException('Username already taken');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    return await this.UserService.create(createUserDto);
}

async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload: AuthPayload = { 
        id: user.id,
        name: user.username,
        email: user.email,
        permissions: await this.UserService.getUserPermissions(user.id),
    };
    return await this.jwtService.signAsync(payload);
}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.UserService.findByUsername(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
	}
}