import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';
import { ProductRepository } from './repositories/products.repositories';
import { CategoryModule } from '../categories/categories.module';
import { CPU } from './entities/cpu.entity';
import { CpuController } from './controllers/cpu.controller';
import { CpuProductService } from './services/cpu-product.service';
import { CpuRepository } from './repositories/cpu.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CPU]), CategoryModule],
  controllers: [ProductController, CpuController],
  providers: [
    ProductService,
    ProductRepository,
    CpuProductService,
    CpuRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
