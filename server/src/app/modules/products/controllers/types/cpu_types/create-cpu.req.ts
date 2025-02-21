import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { CreateProductReq } from '../create-product.req';
import { SocketType } from '../../../enums/socket-type.enum';

export class CreateCpuReq extends CreateProductReq {
  @ApiProperty()
  @IsString()
  socket_type: SocketType;

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
  @IsOptional()
  @Min(0)
  pCores?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  eCores?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
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
  @IsNumber()
  wattage: number;

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
  @IsOptional()
  @Min(0)
  pcie_slots?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  max_memory_capacity?: number;
}
