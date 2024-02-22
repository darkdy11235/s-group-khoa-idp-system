import { ApiProperty } from "@nestjs/swagger";

export class AssignPermissionsDto {
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    permissions: number[];
}