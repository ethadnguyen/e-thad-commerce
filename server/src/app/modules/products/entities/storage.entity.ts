import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('Storage')
export class Storage {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'storage_type',
    type: 'varchar',
    length: 255,
  })
  storageType: string;

  @Column({
    type: 'int',
  })
  capacity: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  interface: string;

  @Column({
    type: 'int',
  })
  readSpeed: number;

  @Column({
    type: 'int',
  })
  writeSpeed: number;

  @Column({
    name: 'form_factor',
    type: 'varchar',
    length: 255,
  })
  formFactor: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
