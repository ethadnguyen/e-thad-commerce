import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { ModuleType } from '../enums/module-type.enum';
import { ChannelType } from '../enums/channel-type.enum';
import { RamType } from '../enums/ram-type.enum';

@Entity('ram')
export class RAM {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column({
    type: 'enum',
    enum: RamType,
  })
  type: RamType;

  @Column()
  speed: number;

  @Column()
  modules: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  latency: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  voltage: number;

  @Column({
    type: 'enum',
    enum: ModuleType,
  })
  moduleType: ModuleType;

  @Column({ default: false })
  ecc_support: boolean;

  @Column({ default: 'Single' })
  channel: ChannelType;

  @Column({ nullable: true })
  timing: string;

  @Column({ default: false })
  rgb: boolean;

  @Column({ default: false })
  heatSpreader: boolean;
}
