import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCategoryReqDto {
  @ApiProperty({
    description: 'ID của danh mục',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  parentId?: number;
}
