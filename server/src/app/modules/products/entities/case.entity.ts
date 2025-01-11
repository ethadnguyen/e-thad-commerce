import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('Case')
export class Case {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'form_factor',
    type: 'varchar',
    length: 20,
  })
  formFactor: string;

  @Column({
    type: 'int',
  })
  maxGpuLength: number;

  @Column({
    type: 'int',
  })
  maxCpuCoolerHeight: number;

  @Column({
    type: 'int',
  })
  driveBays: number;

  @Column({
    type: 'json',
  })
  frontIo: object;

  @Column({
    name: 'psu_support',
    type: 'varchar',
    length: 20,
  })
  psuSupport: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
