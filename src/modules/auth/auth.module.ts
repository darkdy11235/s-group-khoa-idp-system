import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [AuthController],
  providers: [RoleService],
})
export class AuthModule {}
