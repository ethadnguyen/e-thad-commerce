import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './products.entity';
import { SocketType } from 'dgram';
import { CoolingType } from '../enums/cooling-type.enum';

@Entity('cooling')
export class Cooling {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id' })
  product: Product;

  @Column()
  cooling_type: CoolingType;

  @Column()
  size: string;

  @Column({
    type: 'array',
    default: [],
  })
  socket_support: SocketType[];

  @Column()
  fan_speed: number;

  @Column()
  noise_level: number;

  @Column()
  fan_size: string;
}
