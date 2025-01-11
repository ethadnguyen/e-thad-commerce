import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationReq } from './types/pagination.req';

@Injectable()
export class PaginationService {
  async paginate<T, R>(
    repository: Repository<T>,
    paginationDto: PaginationReq,
    ResponseClass: new (
      data: T[],
      total: number,
      totalPages: number,
      currentPages: number,
    ) => R,
    queryOptions?: FindManyOptions<T>,
  ): Promise<R> {
    const { page, limit } = paginationDto;

    const [data, total] = await repository.findAndCount({
      ...queryOptions,
      skip: (page - 1) * limit,
      take: limit,
    });

    return new ResponseClass(data, total, Math.ceil(total / limit), page);
  }
}
