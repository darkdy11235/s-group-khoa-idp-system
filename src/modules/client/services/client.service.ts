import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { CreateClientDto } from '../dto/create-client.dto';
@Injectable()
export class ClientService {
	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>,

        // inject the UserService
        private readonly userService: UserService,
	) {}
	
    async create(createClientDto: CreateClientDto) {
        // create a new client with user_id
        const client = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(client);
    }

    async find() {
        return await this.clientRepository.find();
    }

    async findById(id: string) {
        return await this.clientRepository.findOne({ where: { id } });
    }

    async update(id: string, updateClientDto: any) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return await this.clientRepository.save({ ...client, ...updateClientDto });
    }

    async delete(id: string) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return await this.clientRepository.remove(client);
    }
}