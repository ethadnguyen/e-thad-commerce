import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../addresses/entities/addresses.entity';
import { Order } from '../../orders/entities/orders.entity';

@Entity()
export class Customer {
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
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: true,
  })
  roles: string[];

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

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
