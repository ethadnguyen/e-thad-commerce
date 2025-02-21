import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductReq } from '../update-product.req';
import { CoolingType } from '../../../enums/cooling-type.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { SocketType } from '../../../enums/socket-type.enum';

export class UpdateCoolingReq extends UpdateProductReq {
  @ApiProperty()
  @IsEnum(CoolingType)
  @IsOptional()
  cooling_type?: CoolingType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(SocketType, { each: true })
  @IsOptional()
  socket_support?: SocketType[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fan_speed?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noise_level?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fan_size?: number;
}
