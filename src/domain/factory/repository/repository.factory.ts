import { Inject } from '@nestjs/common';
import { PaginationOptionsDto } from 'src/domain/dtos/pagination/pagination-options.dto';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

export abstract class RepositoryFactory<E> {
  @Inject(PrismaService)
  public readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create<T>(createDto: T): Promise<E> {
    return this.prismaService[this.model].create({ data: createDto });
  }

  findAll({ page, per_page }: PaginationOptionsDto): Promise<E[]> {
    return this.prismaService[this.model].findMany({
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: string | number): Promise<E> {
    return this.prismaService[this.model].findFirst({ where: { id } });
  }
}
