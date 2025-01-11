import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Laptop Gaming',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Mô tả danh mục',
    example: 'Các sản phẩm laptop chuyên dụng cho gaming',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID của danh mục cha',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  parentCategoryId?: number;
}
