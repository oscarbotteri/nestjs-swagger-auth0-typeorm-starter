import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto, SuccessResponseDto } from '../common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(
    pagination: PaginationDto,
  ): Promise<SuccessResponseDto<UserEntity[]>> {
    const [results, total] = await this.usersRepository.findAndCount({
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
      order: {
        createdAt: 'desc',
      },
    });

    return {
      total,
      results,
    };
  }

  async create(payload: CreateUserDto): Promise<void> {
    await this.usersRepository.insert(payload);
  }
}
