import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
    //name, description, and redirect_uris, user_id are required
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    redirect_uris: string[];
    @ApiProperty()
    user_id: string;
}