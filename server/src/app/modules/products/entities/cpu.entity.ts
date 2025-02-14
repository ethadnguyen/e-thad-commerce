import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { SocketType } from '../enums/socket-type.enum';

@Entity('cpu')
export class CPU {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column({
    type: 'enum',
    enum: SocketType,
  })
  socket_type: SocketType;

  @Column()
  cores: number;

  @Column()
  threads: number;

  @Column('decimal', { precision: 3, scale: 1 })
  baseClock: number;

  @Column('decimal', { precision: 3, scale: 1 })
  boostClock: number;

  @Column()
  wattage: string;

  @Column()
  pCores: number;

  @Column()
  eCores: number;

  @Column('decimal', { precision: 3, scale: 1 })
  pCoreBaseClock: number;

  @Column('decimal', { precision: 3, scale: 1 })
  pCoreBoostClock: number;

  @Column('decimal', { precision: 3, scale: 1 })
  eCoreBaseClock: number;

  @Column('decimal', { precision: 3, scale: 1 })
  eCoreBoostClock: number;

  @Column()
  tdp: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  cache: string;

  @Column()
  pcie_version: string;

  @Column()
  pcie_slots: number;

  @Column()
  max_memory_capacity: number;
}
