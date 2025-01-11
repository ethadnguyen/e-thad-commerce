import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('Cooling')
export class Cooling {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'cooling_type',
    type: 'varchar',
    length: 255,
  })
  coolingType: string;

  @Column({
    type: 'int',
  })
  maxTdp: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  fanSize: number;

  @Column({
    name: 'radiator_support',
    type: 'varchar',
    length: 255,
  })
  radiatorSupport: string;

  @Column({
    name: 'socket_compatibility',
    type: 'json',
  })
  socketCompatibility: string[];

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
