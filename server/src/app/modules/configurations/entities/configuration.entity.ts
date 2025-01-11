import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../users/entities/users.entity';
import { ConfigurationItem } from './configuration-item.entity';

@Entity('Configuration')
export class Configuration {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @OneToMany(() => ConfigurationItem, (item) => item.configuration)
  items: ConfigurationItem[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
