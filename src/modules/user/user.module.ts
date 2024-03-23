import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { AuthModule } from '../auth/modules/auth.module';
import { RoleService } from '../auth/services/role.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AuthModule],
  controllers: [UserController],
  providers: [UserService, RoleService],
})
export class UserModule {}
