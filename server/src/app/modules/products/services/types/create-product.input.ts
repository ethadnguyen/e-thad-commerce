import { ProductType } from '../../enums/product-type.enum';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number | number[];
  images?: string[];
  specifications?: object;
  type: ProductType;
  is_active?: boolean;
}
