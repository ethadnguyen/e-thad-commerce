import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private repo: Repository<Permission>,
  ) {}

  async findAll(paginationOptions: {
    skip: number;
    take: number;
  }): Promise<[Permission[], number]> {
    const [permissions, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
    });

    return [permissions, total];
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async isPermissionTableEmpty(): Promise<boolean> {
    const count = await this.repo.count();
    return count === 0;
  }

  async create(permission: Permission) {
    const newPermission = await this.repo.save(permission);
    return newPermission;
  }
}
