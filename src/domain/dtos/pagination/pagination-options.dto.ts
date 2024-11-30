import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number | null = 1;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(25)
  per_page?: number | null = 10;
}
