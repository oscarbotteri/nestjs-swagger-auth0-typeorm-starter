import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiSuccessResponse,
  Pagination,
  PaginationDto,
  SuccessResponseDto,
} from '../common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  @ApiSuccessResponse(UserEntity)
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Pagination() pagination: PaginationDto,
  ): Promise<SuccessResponseDto<UserEntity[]>> {
    return this.usersService.findAll(pagination);
  }

  @Post('/users')
  @UseGuards(JwtAuthGuard)
  async create(@Body() payload: CreateUserDto): Promise<void> {
    await this.usersService.create(payload);
  }
}
