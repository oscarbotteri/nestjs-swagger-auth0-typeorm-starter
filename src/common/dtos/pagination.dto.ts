import { IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(1)
  page: number;
}
