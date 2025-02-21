import { ProductType } from '@/services/types/request/product-req';
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  price: z.number().min(0, 'Giá không hợp lệ'),
  stock: z.number().min(0, 'Số lượng không hợp lệ'),
  category_ids: z.array(z.number()),
  is_active: z.boolean(),
  type: z.nativeEnum(ProductType),
  specifications: z.record(z.string(), z.string()),
});

export type ProductFormValues = z.infer<typeof productSchema>;
