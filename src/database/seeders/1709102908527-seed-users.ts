import { MigrationInterface, QueryRunner } from 'typeorm';
import { DigestService } from '../services/digest.service';
import { SystemRoles } from '../enums/system-roles.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/auth/entities/role.entity';

export class SeedUsers1709102908527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        const roleRepository = queryRunner.manager.getRepository(Role);
    
        const adminRole = await roleRepository.findOne({
          where: {
            name: SystemRoles.CHAIRMAN,
          },
        });
        const digestService = new DigestService();
        const password = await digestService.hash('chairmain123');
        const user = new User();
        user.fullName = 'Chairmain';
        user.email = 'chairmain@gmail.com';
        user.username = 'chairmain';
        user.password = password;
        user.roles = [adminRole];
        await userRepository.save(user);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        await userRepository.delete({
          username: 'test',
        });
      }
}
