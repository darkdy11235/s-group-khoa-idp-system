import { Role } from 'src/auth/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    name: 'full_name',
    nullable: true,
  })
  fullName: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'birthday',
    nullable: true,
  })
  birthday?: Date;

  @Column({
    name: 'phone_number',
    nullable: true,
  })
  phoneNumber: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];
}