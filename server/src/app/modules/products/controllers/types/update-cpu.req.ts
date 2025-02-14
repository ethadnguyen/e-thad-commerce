import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { UpdateProductReq } from './update-product.req';

export class UpdateCpuReq extends UpdateProductReq {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  socketType?: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  cores?: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  threads?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  baseClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  boostClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  tdp?: number;

  @ApiProperty()
  @IsString()
  cache?: string;
}
