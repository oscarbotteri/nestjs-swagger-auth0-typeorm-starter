import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaginationDto } from '../dtos';

export const paginationFactory = (
  _data: string | undefined,
  ctx: ExecutionContext,
): PaginationDto => {
  const { query } = ctx.switchToHttp().getRequest();
  const { page, limit } = query;

  return plainToClass(PaginationDto, {
    page: Number(page) || 1,
    limit: Number(limit) || 100,
  });
};

export const Pagination = createParamDecorator(paginationFactory);
