import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { RoleModule } from './role.module';
import { PermissionModule } from '../modules/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { PermissionService } from '../services/permission.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';
import { User } from 'src/modules/user/entities/user.entity';
import { RoleService } from '../services/role.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    RoleModule,
    PermissionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PermissionService, UserService, RoleService],
})
export class AuthModule {}
