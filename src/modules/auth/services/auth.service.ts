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
    console.log(createUserDto);
    if (user) {
        throw new NotAcceptableException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    bcrypt.compare('testpassword', hashedPassword, function(err, result) {
        if (err) { console.log ('error' + err); }
        console.log('compare passs  register' + hashedPassword);
        console.log('compare passs ' + result);
    });
    const newUser = await this.UserService.create({ ...createUserDto, password: hashedPassword });
    return newUser;
}

async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    console.log('user', user);
    const payload: AuthPayload = { 
        id: user.id,
        name: user.username,
        email: user.email,
        permissions: await this.UserService.getUserPermissions(user.id),
    };
    console.log('payload', payload);
    return await this.jwtService.signAsync(payload);
}

async logout(): Promise<any> {
    const payload: AuthPayload = {
        id: 0,
        name: 'guest',
        email: 'guest',
        permissions: [],
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

    async refreshToken(): Promise<any> {
        const payload: AuthPayload = {
            id: 0,
            name: 'guest',
            email: 'guest',
            permissions: [],
        };
        return await this.jwtService.signAsync(payload);
    }
}