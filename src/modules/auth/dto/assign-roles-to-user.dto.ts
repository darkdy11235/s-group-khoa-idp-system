import { ApiProperty } from "@nestjs/swagger";

export class AssignRolesToUserDto {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    roleIds: number[];
}