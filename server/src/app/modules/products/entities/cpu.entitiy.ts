import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('CPU')
export class CPU {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'int',
  })
  cores: number;

  @Column({
    type: 'int',
  })
  threads: number;

  @Column({
    name: 'base_clock',
    type: 'float',
  })
  baseClock: number;

  @Column({
    name: 'boost_clock',
    type: 'float',
  })
  boostClock: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  socket: string;

  @Column({
    type: 'int',
  })
  tdp: number;

  @Column({
    name: 'integrated_gpu',
    type: 'boolean',
    default: false,
  })
  integratedGpu: boolean;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
