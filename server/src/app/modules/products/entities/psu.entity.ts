import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { ATX12VType } from '../enums/atx12-type.enum';
import { ProtectionType } from '../enums/protection-type.enum';

@Entity('psu')
export class PSU {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column()
  wattage: number;

  @Column()
  efficiency_rating: number;

  @Column()
  form_factor: string;

  @Column()
  modular: boolean;

  @Column()
  input_voltage: number;

  @Column()
  fan_size: number;

  @Column()
  fan_speed: number;

  @Column()
  noise_level: number;

  @Column()
  fan_bearing: string;

  @Column()
  rgb: boolean;

  @Column({
    type: 'enum',
    enum: ATX12VType,
    default: ATX12VType.ATX12V_2_4,
  })
  atx12vVersion: ATX12VType;

  @Column()
  pcie_connectors: number;

  @Column()
  sata_connectors: number;

  @Column()
  eps_connectors: number;

  @Column({
    type: 'enum',
    enum: ProtectionType,
    array: true,
    default: [],
  })
  protection_features: ProtectionType[];
}
