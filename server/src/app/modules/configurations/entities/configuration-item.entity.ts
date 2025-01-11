import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { Configuration } from './configuration.entity';
import { CompatibilityStatus } from 'src/core/utils/compatibility-status';

@Entity('Configuration_Items')
export class ConfigurationItem {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'compatibility_status',
    type: 'enum',
    enum: CompatibilityStatus,
  })
  compatibilityStatus: CompatibilityStatus;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Configuration, (config) => config.items)
  configuration: Configuration;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
