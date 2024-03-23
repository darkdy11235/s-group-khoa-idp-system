import { applyDecorators } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';

export function Auth(...permissions: String[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard, PermissionsGuard),
  );
}
