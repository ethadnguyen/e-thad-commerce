import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { ProductType } from '../enums/product-type.enum';
import { CPU } from './cpu.entity';
import { GPU } from './gpu.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  // @Column({
  //   type: 'jsonb',
  //   nullable: true,
  // })
  // specifications: object;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({
    type: 'enum',
    enum: ProductType,
    nullable: true,
  })
  type: ProductType;

  @OneToOne(() => CPU, (cpu) => cpu.product, { cascade: true })
  cpu?: CPU;

  @OneToOne(() => GPU, (gpu) => gpu.product, { cascade: true })
  gpu?: GPU;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
