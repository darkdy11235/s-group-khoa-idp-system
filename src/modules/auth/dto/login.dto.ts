import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password@example',
  })
  @IsNotEmpty()
  password: string;
}