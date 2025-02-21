import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { MainboardFormFactor } from '../enums/mainboard-type.enum';
import { SocketType } from '../enums/socket-type.enum';

@Entity('mainboard')
export class Mainboard {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column()
  form_factor: MainboardFormFactor;

  @Column()
  socket_type: SocketType;

  @Column()
  chipset: string;

  @Column()
  ram_slots: number;

  @Column()
  max_ram_capacity: number;

  @Column()
  pcie_slots: number;

  @Column()
  pcie_version: string;

  @Column()
  m2_slots: number;

  @Column()
  sata_slots: number;

  @Column()
  usb_ports: number;

  @Column()
  lan: string;

  @Column()
  wireless: string;

  @Column()
  audio: string;

  @Column()
  graphics_integrated: string;

  @Column()
  bios_version: string;

  @Column()
  rgb: boolean;

  @Column()
  size: string;
}
