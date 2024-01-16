import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { PaginationDto } from '../dtos';
import { paginationFactory } from './pagination.decorator';

describe('Pagination', () => {
  let executionContext: DeepMocked<ExecutionContext>;

  beforeEach(() => {
    executionContext = createMock<ExecutionContext>();
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return a pagination DTO', () => {
    executionContext.switchToHttp().getRequest.mockReturnValue({
      query: { page: 2, limit: 50 },
    });

    const data = paginationFactory(undefined, executionContext);
    expect(data).toBeInstanceOf(PaginationDto);
    expect(instanceToPlain(data)).toStrictEqual({ page: 2, limit: 50 });
  });

  it('should return default values', () => {
    const data = paginationFactory(undefined, executionContext);
    expect(data).toBeInstanceOf(PaginationDto);
    expect(instanceToPlain(data)).toStrictEqual({ page: 1, limit: 100 });
  });
});
