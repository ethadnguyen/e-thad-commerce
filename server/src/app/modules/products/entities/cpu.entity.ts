import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity('cpu')
export class CPU {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column({
    type: 'varchar',
    length: 255,
  })
  socketType: string;

  @Column()
  cores: number;

  @Column()
  threads: number;

  @Column()
  baseClock: number;

  @Column()
  boostClock: number;

  @Column()
  tdp: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  cache: string;
}
