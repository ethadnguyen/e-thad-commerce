import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { User } from '../../users/entities/users.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  customer: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;
}
