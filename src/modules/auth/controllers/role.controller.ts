import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Role Management')
@Controller('role')
export class RoleController {
    constructor() {}
}