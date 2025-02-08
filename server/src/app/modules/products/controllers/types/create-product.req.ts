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
} from 'class-validator';

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

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  specifications?: object;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
