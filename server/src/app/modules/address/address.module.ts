import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Address } from './entities/address.entity';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { AddressRepository } from './repositories/address.repositories';
import { GoongService } from './services/goong.service';
import goongConfig from '../../../config/goong/goong.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    ConfigModule.forFeature(goongConfig),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, GoongService],
  exports: [AddressService],
})
export class AddressModule {}
