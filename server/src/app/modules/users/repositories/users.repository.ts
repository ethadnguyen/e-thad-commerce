import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(paginationOptions: {
    skip: number;
    take: number;
  }): Promise<[User[], number]> {
    const [users, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
    });
    return [users, total];
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { user_id: id },
    });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
    });
  }

  async isUserTableEmpty(): Promise<boolean> {
    const count = await this.repo.count();
    return count === 0;
  }

  async create(user: User) {
    const userdb = await this.repo.save(user);
    return await this.findById(userdb.user_id);
  }

  async update(updateData: Partial<User>): Promise<User> {
    await this.repo.save(updateData);
    return this.repo.findOne({
      where: { user_id: updateData.user_id },
    });
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  }
}
