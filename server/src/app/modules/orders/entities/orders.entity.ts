import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Address } from '../../addresses/entities/addresses.entity';
import { OrderItem } from './order-items.entity';
import { User } from '../../users/entities/users.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'int',
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_price: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (customer) => customer.orders)
  customer: User;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;
}
