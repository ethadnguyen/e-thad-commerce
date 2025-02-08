import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';

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

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  specifications: object;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

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
