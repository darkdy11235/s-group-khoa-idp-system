import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/roles.enum';
import { UserService } from 'src/modules/user/user.service';
import { RoleService } from 'src/modules/auth/services/role.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    
    if (!requiredPermissions) {
      // No permissions are required, so access is allowed
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    // Retrieve user's roles and permissions
    const userRoles = await this.userService.getUserRoles(userId);
    const userPermissions = await this.roleService.getRolePermissions(userRoles);

    // Check if the user has the required permissions
    const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
