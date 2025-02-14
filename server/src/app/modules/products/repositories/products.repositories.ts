import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { CPU } from '../entities/cpu.entity';
import { ProductType } from '../enums/product-type.enum';

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
    const queryBuilder = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.cpu', 'cpu')
      .leftJoinAndSelect('product.gpu', 'gpu')
      .where('product.id = :id', { id });

    return await queryBuilder.getOne();
  }

  async findAll(
    PaginationOptions: {
      skip: number;
      take: number;
    },
    category?: number,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.cpu', 'cpu')
      .leftJoinAndSelect('product.gpu', 'gpu');

    if (category) {
      queryBuilder.andWhere('category.id = :category', { category });
    }

    queryBuilder.orderBy('product.created_at', 'DESC');
    return await queryBuilder.getManyAndCount();
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.repo.update(id, product);
    return await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
