import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/orders.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  label: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  province: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  district: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  ward: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  street: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  postal_code: string;

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

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  user: User;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
