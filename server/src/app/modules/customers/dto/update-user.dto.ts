import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-user.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
