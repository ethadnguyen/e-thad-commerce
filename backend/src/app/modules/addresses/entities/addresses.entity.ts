import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity';
import { Order } from '../../orders/entities/orders.entity';

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
  customer: Customer;

  @ManyToOne(() => Order, (order) => order.addresses)
  order: Order;
}
