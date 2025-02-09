import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class GPU {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column({
    type: 'varchar',
    length: 255,
  })
  chipset: string;

  @Column()
  memorySize: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  memoryType: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  coreClock: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  boostClock: number;

  @Column()
  tdp: number;
}
