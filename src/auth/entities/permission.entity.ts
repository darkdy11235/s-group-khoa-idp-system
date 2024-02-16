import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Role } from './role.entity';
  
  @Entity({
    name: 'permissions',
  })
  export class Permission {
    @PrimaryGeneratedColumn('increment')
    id: string;
  
    @Column({
      name: 'name',
      type: 'varchar',
      nullable: false,
      unique: true,
    })
    name: string;
  
    @Column({
      name: 'description',
      type: 'varchar',
      nullable: true,
    })
    description: string;
    @Column({
      name: 'created_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    @Column({
      name: 'updated_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
    @Column({
      name: 'deleted_at',
      type: 'timestamp',
      nullable: true,
    })
    deletedAt: Date;
    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({
      name: 'roles_permissions',
      joinColumn: {
        name: 'permission_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    })
    roles?: Role[];
  }
  export default Permission;