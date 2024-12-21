import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../../core/utils/roles';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsArray()
  roles?: Role[];
}
