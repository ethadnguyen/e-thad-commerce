import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationReqDto } from '@/app/common/dto/pagination.dto';

export class GetAllCategoriesReqDto extends PaginationReqDto {
  @ApiPropertyOptional({
    description: 'Chỉ lấy danh mục gốc',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  rootOnly?: boolean;
} 