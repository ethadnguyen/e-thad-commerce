import { StatusUser } from 'src/common/enum/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  user_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 11,
  })
  phone: string;

  @Column({ default: StatusUser.ENABLE })
  status: StatusUser;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_name',
      referencedColumnName: 'name',
    },
  })
  role: Role[];

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
