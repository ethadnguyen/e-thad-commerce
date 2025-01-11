import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';

@Entity('Product_Promotion')
export class ProductPromotion {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Product, (product) => product.productPromotions)
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotions)
  promotion: Promotion;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
