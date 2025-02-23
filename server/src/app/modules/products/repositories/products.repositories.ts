import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, In } from 'typeorm';
import { Product } from '../entities/products.entity';
import { CPU } from '../entities/cpu.entity';
import { ProductType } from '../enums/product-type.enum';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    const savedProduct = await this.productRepo.save(product);
    return await this.productRepo.findOne({
      where: { id: savedProduct.id },
      relations: ['categories'],
    });
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('product.id = :id', { id })
      .getOne();
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    return await this.productRepo.find({
      where: { id: In(ids) },
      relations: ['categories'],
    });
  }

  async findAll(
    paginationOptions: {
      skip: number;
      take: number;
    },
    category_id?: number,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.productRepo.createQueryBuilder('product');

    queryBuilder.leftJoinAndSelect('product.categories', 'categories');

    if (category_id) {
      queryBuilder.andWhere('categories.id = :category_id', { category_id });
    }

    queryBuilder
      .orderBy('product.created_at', 'DESC')
      .skip(paginationOptions.skip)
      .take(paginationOptions.take);

    const [products, total] = await queryBuilder.getManyAndCount();

    return [products, total];
  }

  async update(product: Product): Promise<Product> {
    const savedProduct = await this.productRepo.save(product);
    return await this.findById(savedProduct.id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }
}
