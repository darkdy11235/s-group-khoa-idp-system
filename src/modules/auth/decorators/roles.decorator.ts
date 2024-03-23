import { SetMetadata } from '@nestjs/common';
import { SystemRoles } from 'src/database/enums/system-roles.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: SystemRoles[]) => SetMetadata(ROLE_KEY, role);
