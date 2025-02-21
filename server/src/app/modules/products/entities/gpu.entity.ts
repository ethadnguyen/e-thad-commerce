import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class GPU {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column({
    type: 'varchar',
    length: 255,
  })
  chipset: string;

  @Column()
  memory_size: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  memory_type: string;

  @Column()
  min_psu_wattage: number;

  @Column()
  power_connector: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  core_clock: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  boost_clock: number;

  @Column()
  tdp: number;

  @Column()
  pcie_version: string;

  @Column()
  slot_size: number;

  @Column()
  cuda_cores: number;

  @Column()
  tensor_cores: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  display_ports: string;

  @Column()
  length: number;
}
