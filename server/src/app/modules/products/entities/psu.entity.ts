import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('PSU')
export class PSU {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'int',
  })
  power: number;

  @Column({
    name: 'efficiency_rating',
    type: 'varchar',
    length: 255,
  })
  efficiencyRating: string;

  @Column({
    name: 'form_factor',
    type: 'varchar',
    length: 255,
  })
  formFactor: string;

  @Column()
  modular: boolean;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
