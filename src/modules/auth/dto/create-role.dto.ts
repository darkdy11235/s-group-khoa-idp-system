import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'CHAIRMAN',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'This is the chairman role',
  })
  @IsNotEmpty()
  description: string;
}
