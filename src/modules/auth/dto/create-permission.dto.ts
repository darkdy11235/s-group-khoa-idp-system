import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Permission name',
    example: 'VIEW_USERS',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Permission description',
    example: 'View users',
  })
  @IsNotEmpty()
  description: string;
}
