import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    // get the user
    const user = await this.userService.findById(createClientDto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // check if the client already exists
    const clientExists = await this.clientRepository.findOne({
      where: { name: createClientDto.name },
    });
    if (clientExists) {
      throw new ConflictException('Client already exists');
    }

    const clientData = {
        ...createClientDto,
        client_secret: String(Math.random().toString(36).substring(2))
    };
    // push the client secret to the client data
    
    const client = this.clientRepository.create(clientData);

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
