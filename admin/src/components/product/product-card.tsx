'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { ProductRes } from '@/services/types/response/product-res';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { timeSince } from '@/lib/utils';

interface ProductCardProps {
  product: ProductRes;
  className?: string;
  onClick?: () => void;
}

export function ProductCard({ product, className, onClick }: ProductCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className='relative aspect-square'>
        <Image
          src={
            product.images?.[0] || 'https://placehold.co/400x400?text=No+Image'
          }
          alt={product.name}
          fill
          unoptimized
          className='object-cover'
        />
        <Badge
          variant={product.is_active ? 'default' : 'secondary'}
          className='absolute top-2 right-2'
        >
          {product.is_active ? 'Đang bán' : 'Ngừng bán'}
        </Badge>
      </div>
      <CardContent className='p-4'>
        <h3 className='font-semibold text-lg line-clamp-2 mb-2'>
          {product.name}
        </h3>
        {/* <p className='text-sm text-gray-500 mb-2'>
          Cập nhật {timeSince(product.updated_at)}
        </p> */}
        <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
          {product.description}
        </p>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <p className='text-primary font-medium'>
              {formatCurrency(product.price)}
            </p>
            <p className='text-gray-600 text-sm'>
              Còn {product.stock} sản phẩm
            </p>
          </div>

          <div className='pt-2 border-t border-gray-100 space-y-1'>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Tag className='w-4 w-4' />
              <div className='flex flex-wrap gap-1'>
                {product.categories?.map((category) => (
                  <Badge key={category.id} variant='outline'>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
