import { ApiProperty } from '@nestjs/swagger';
import { CategoryRes } from '../../../categories/controllers/types/category.res';
import { ProductType } from '../../enums/product-type.enum';

export class ProductRes {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ type: [String] })
  images: string[];

  // @ApiProperty()
  // specifications: object;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  category: CategoryRes;

  @ApiProperty({ enum: ProductType })
  type: ProductType;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
