import { Module } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { UserService } from 'src/modules/user/user.service';
import { PermissionService } from '../services/permission.service';
import { User } from 'src/modules/user/entities/user.entity';
import { PermissionController } from '../controllers/permission.controller';
import { Permission } from '../entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, User])],
  controllers: [PermissionController],
  providers: [RoleService, UserService, PermissionService],
  exports: [],
})
export class PermissionModule {}
