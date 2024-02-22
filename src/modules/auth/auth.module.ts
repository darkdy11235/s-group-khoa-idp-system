import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './services/permission.service';
import { UserService } from '../user/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  }),
],
  controllers: [AuthController, RoleController, PermissionController],
  providers: [RoleService, PermissionService, UserService, AuthService],
})
export class AuthModule {}
