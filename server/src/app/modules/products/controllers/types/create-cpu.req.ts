import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { CreateProductReq } from './create-product.req';

export class CreateCpuReq extends CreateProductReq {
  @ApiProperty()
  @IsString()
  socketType: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  cores: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  threads: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  baseClock: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  boostClock: number;

  @ApiProperty()
  @IsNumber()
  pCores: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  eCores: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pCoreBaseClock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  pCoreBoostClock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  eCoreBaseClock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  eCoreBoostClock?: number;

  @ApiProperty()
  @IsString()
  wattage: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  tdp: number;

  @ApiProperty()
  @IsString()
  cache: string;

  @ApiProperty()
  @IsString()
  pcie_version: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pcie_slots: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  max_memory_capacity: number;
}
