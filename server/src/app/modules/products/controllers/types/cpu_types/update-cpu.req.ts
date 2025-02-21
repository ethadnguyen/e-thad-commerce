import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { UpdateProductReq } from '../update-product.req';
import { SocketType } from '../../../enums/socket-type.enum';

export class UpdateCpuReq extends UpdateProductReq {
  @ApiProperty()
  @IsString()
  @IsOptional()
  socket_type?: SocketType;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsOptional()
  cores?: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsOptional()
  threads?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  baseClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  boostClock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wattage?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  eCores?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  pCores?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  eCoreBaseClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  eCoreBoostClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  pCoreBaseClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  pCoreBoostClock?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  tdp?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cache?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pcie_version?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  pcie_slots?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  max_memory_capacity?: number;
}
