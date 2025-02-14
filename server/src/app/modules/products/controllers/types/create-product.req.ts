import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  Min,
  IsObject,
  IsEnum,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from '../../enums/product-type.enum';
import { CpuDetailsReq, GpuDetailsReq } from './product-details.req';

export class CreateProductReq {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty()
  @IsNumber()
  category: number;

  @ApiProperty({ enum: ProductType })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @IsObject()
  // specifications?: object;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.type === ProductType.CPU)
  @ValidateNested()
  @Type(() => CpuDetailsReq)
  cpuDetails?: CpuDetailsReq;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.type === ProductType.GPU)
  @ValidateNested()
  @Type(() => GpuDetailsReq)
  gpuDetails?: GpuDetailsReq;
}
