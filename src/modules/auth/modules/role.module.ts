import { Module } from "@nestjs/common";
import { RoleController } from "../controllers/role.controller";
import { RoleService } from "../services/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { UserService } from "src/modules/user/user.service";
import { User } from "src/modules/user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Role, User]),
    ],
    controllers: [RoleController],
    providers: [RoleService, UserService],
    exports: []
})
export class RoleModule {};