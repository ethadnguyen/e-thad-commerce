import { CoolingType } from '../../../enums/cooling-type.enum';
import { SocketType } from '../../../enums/socket-type.enum';
import { CreateProductInput } from '../create-product.input';

export interface CreateCoolingInput extends CreateProductInput {
  cooling_type: CoolingType;
  size: string;
  socket_support: SocketType[];
  fan_speed: number;
  noise_level: number;
  fan_size: number;
}
