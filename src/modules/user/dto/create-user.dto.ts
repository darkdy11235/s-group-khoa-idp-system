import { IsString, IsEmail, IsNotEmpty, IsDateString, IsPhoneNumber, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly full_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsDateString()
    @IsOptional()
    readonly birthday: Date;

    @IsPhoneNumber()
    @IsOptional()
    readonly phone_number: string;
}
