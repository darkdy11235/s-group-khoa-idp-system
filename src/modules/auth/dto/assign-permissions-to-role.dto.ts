import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionsToRoleDto {
  @ApiProperty()
  roleId: number;
  @ApiProperty()
  permissionIds: number[];
}
