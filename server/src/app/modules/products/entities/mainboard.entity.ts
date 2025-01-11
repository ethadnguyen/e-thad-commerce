import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity('Mainboard')
export class Mainboard {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  chipset: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  socket: string;

  @Column({
    name: 'form_factor',
    type: 'varchar',
    length: 255,
  })
  formFactor: string;

  @Column({
    name: 'memory_slots',
    type: 'int',
  })
  memorySlots: number;

  @Column({
    name: 'max_memory',
    type: 'int',
  })
  maxMemory: number;

  @Column({
    name: 'supported_ram_types',
    type: 'json',
  })
  supportedRamTypes: string[];

  @Column({
    name: 'pcie_slots',
    type: 'json',
  })
  pcieSlots: object;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;
}
