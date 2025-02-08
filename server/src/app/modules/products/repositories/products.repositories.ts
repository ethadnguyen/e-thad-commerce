import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    const savedProduct = await this.repo.save(product);
    return await this.repo.findOne({
      where: { id: savedProduct.id },
      relations: ['category'],
    });
  }

  async findById(id: number): Promise<Product> {
    return await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findAll(
    PaginationOptions: {
      skip: number;
      take: number;
    },
    category?: number,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.repo.createQueryBuilder('product');
    queryBuilder.leftJoinAndSelect('product.category', 'category');

    if (category) {
      queryBuilder.andWhere('category.id = :category', { category });
    }

    queryBuilder.orderBy('product.created_at', 'DESC');
    const [products, total] = await queryBuilder.getManyAndCount();
    return [products, total];
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.repo.save(product);
    return await this.repo.findOne({
      where: { id: updatedProduct.id },
      relations: ['category'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
