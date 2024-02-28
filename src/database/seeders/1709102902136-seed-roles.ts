import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from 'src/modules/auth/entities/role.entity';
import { Permission } from 'src/modules/auth/entities/permission.entity';
import { SystemRoles } from '../enums/system-roles.enum';
import { AccessRights } from '../enums/access-rights.enum';

export class SeedRoles1709102902136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roleRepository = queryRunner.manager.getRepository(Role);
        const permissionRepository = queryRunner.manager.getRepository(Permission);
    
        const savedRoles = await roleRepository.save([
          {
            name: SystemRoles.CHAIRMAN,
            description: 'Chairman of group',
            isEditable: false,
          },
          {
            name: SystemRoles.DOMAIN_CHIEF,
            description: 'User who is the chief of a domain knowledge in group',
          },
          {
            name: SystemRoles.DOMAIN_LEADER,
            description:
              'User who is the leader of a domain knowledge in group, support chief',
          },
          {
            name: SystemRoles.MEMBER,
            description: 'Member in the system',
          },
        ]);
        const savedPermissions = await permissionRepository.save([
          {
            name: AccessRights.VIEW_ACCESS_RIGHTS,
            description: 'View access rights of system',
          },
          {
            name: AccessRights.EDIT_MEMBER_USER,
            description: 'Modify member user',
          },
          {
            name: AccessRights.VIEW_USERS,
            description: 'View users of system',
          },
          {
            name: AccessRights.EDIT_ACCESS_RIGHTS,
            description: 'Edit roles of system',
          },
        ]);
        const roleNameToPermissionNames = {
            [SystemRoles.CHAIRMAN]: [AccessRights.VIEW_ACCESS_RIGHTS, AccessRights.EDIT_ACCESS_RIGHTS, AccessRights.VIEW_USERS, AccessRights.EDIT_MEMBER_USER],
            [SystemRoles.DOMAIN_CHIEF]: [AccessRights.VIEW_USERS, AccessRights.EDIT_MEMBER_USER],
            [SystemRoles.DOMAIN_LEADER]: [AccessRights.VIEW_USERS, AccessRights.EDIT_MEMBER_USER],
            [SystemRoles.MEMBER]: [],
        };

        // Save roles with associated permissions
        for (const role of savedRoles) {
            const permissions = roleNameToPermissionNames[role.name].map(permissionName => {
                return savedPermissions.find(permission => permission.name === permissionName);
            });
            role.permissions = permissions;
            await roleRepository.save(role);
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const roleRepository = queryRunner.manager.getRepository(Role);
        await roleRepository.delete({
          name: In(Object.values(SystemRoles)),
        });
      }

}
