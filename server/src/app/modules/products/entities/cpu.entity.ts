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

  @Column({ nullable: true })
  cores: number;

  @Column({ nullable: true })
  threads: number;

  @Column('decimal', { precision: 3, scale: 1 })
  baseClock: number;

  @Column('decimal', { precision: 3, scale: 1 })
  boostClock: number;

  @Column()
  wattage: number;

  @Column({ nullable: true })
  pCores: number;

  @Column({ nullable: true })
  eCores: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  pCoreBaseClock: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  pCoreBoostClock: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  eCoreBaseClock: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
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

  @Column({ nullable: true })
  pcie_slots: number;

  @Column({ nullable: true })
  max_memory_capacity: number;
}
