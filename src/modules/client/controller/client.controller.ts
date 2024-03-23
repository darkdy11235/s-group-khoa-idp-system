import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { CreateClientDto } from "../dto/create-client.dto";
import { Client } from "../entities/client.entity";
import { AuthGuard, PermissionsGuard } from "../../auth/guards";

@ApiTags("Client")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard, PermissionsGuard)
  @SetMetadata("permissions", ["Create client"])
  async createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @Get("clients")
  @HttpCode(200)
  @UseGuards(AuthGuard, PermissionsGuard)
  @SetMetadata("permissions", ["View clients"])
  async find(): Promise<any> {
    return await this.clientService.find();
  }

  @Patch(":id")
  @HttpCode(200)
  @SetMetadata("permissions", ["Edit client"])
  @UseGuards(AuthGuard, PermissionsGuard)
  async updateClient(
    @Param("id") id: string,
    @Body() updateClientDto: CreateClientDto
  ): Promise<any> {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(":id")
  @HttpCode(200)
  @SetMetadata("permissions", ["Delete client"])
  @UseGuards(AuthGuard, PermissionsGuard)
  async removeClient(@Param("id") id: string): Promise<any> {
    return await this.clientService.delete(id);
  }
}