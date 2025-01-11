import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('RAM')
export class RAM {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'ram_type',
    type: 'varchar',
    length: 255,
  })
  ramType: string;

  @Column({
    type: 'int',
  })
  capacity: number;

  @Column({
    type: 'int',
  })
  speed: number;

  @Column({
    type: 'int',
  })
  modules: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  latency: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
