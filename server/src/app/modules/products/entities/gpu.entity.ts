import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('GPU')
export class GPU {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  chipset: string;

  @Column({
    type: 'int',
  })
  memory: number;

  @Column({
    name: 'memory_type',
    type: 'varchar',
    length: 50,
  })
  memoryType: string;

  @Column({
    name: 'core_clock',
    type: 'float',
  })
  coreClock: number;

  @Column({
    name: 'boost_clock',
    type: 'float',
  })
  boostClock: number;

  @Column({
    name: 'power_comsumption',
    type: 'int',
  })
  powerConsumption: number;

  @Column({
    type: 'int',
  })
  length: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
