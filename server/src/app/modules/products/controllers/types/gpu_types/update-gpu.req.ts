import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductReq } from '../update-product.req';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGpuReq extends UpdateProductReq {
  @ApiProperty()
  @IsString()
  @IsOptional()
  chipset?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  memory_size?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  memory_type?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  min_psu_wattage?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  power_connector?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  core_clock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  boost_clock?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  tdp?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pcie_version?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  slot_size?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cuda_cores?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  tensor_cores?: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  display_ports?: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  length?: number;
}
