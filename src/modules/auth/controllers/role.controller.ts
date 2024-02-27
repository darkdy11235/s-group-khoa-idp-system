import { Controller } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Role Management')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}
}