import { MigrationInterface, QueryRunner } from 'typeorm';
import { DigestService } from '../services/digest.service';
import { SystemRoles } from '../enums/system-roles.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/auth/entities/role.entity';
import * as bcrypt from 'bcrypt';

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
    const adminUser = new User();
    adminUser.fullName = 'Chairmain';
    adminUser.email = 'chairmain@gmail.com';
    adminUser.username = 'chairmain';
    adminUser.password = password;
    adminUser.roles = [adminRole];

    // Seed admin user
    await userRepository.save(adminUser);

    const userRole = await roleRepository.findOne({
      where: {
        name: SystemRoles.MEMBER,
      },
    });

    // Bulk insert random users
    var i = 0;
    const pw = await bcrypt.hash('password123', 10);
    const users = Array.from({ length: 1000 }).map(() => {
      const userData = new User();
      userData.fullName = 'User ' + i;
      userData.email = 'user' + i + '@gmail.com';
      userData.username = 'user' + i;
      userData.password = pw; 
      userData.birthday = randomDate(new Date(1990, 0, 1), new Date());
      userData.roles = [userRole];
      i = i + 1;
      return userData;
    });

    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
  }
}
function randomDate(arg0: Date, arg1: Date): Date {
  return new Date(arg0.getTime() + Math.random() * (arg1.getTime() - arg0.getTime()));
}

