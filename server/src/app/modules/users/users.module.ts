import { Module } from '@nestjs/common';
import { CustomersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class UsersModule {}
