import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationReq } from 'src/common/types/pagination_types/pagination.req';

export class GetAllProductReq extends PaginationReq {
  @ApiPropertyOptional({ description: 'Filter by category id' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  category: number;
}
