import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';
import { ProductRepository } from './repositories/products.repositories';
import { CategoryModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
