import { Role } from 'src/modules/auth/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
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
    nullable: false,
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
    name: any;
}