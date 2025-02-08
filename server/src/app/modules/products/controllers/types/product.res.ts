import { ApiProperty } from '@nestjs/swagger';
import { CategoryRes } from '../../../categories/controllers/types/category.res';

export class ProductRes {
  @ApiProperty()
  id: number;

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

  @ApiProperty()
  specifications: object;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  category: CategoryRes;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
