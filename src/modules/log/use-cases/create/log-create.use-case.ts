import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { CreateLogDto } from 'src/domain/dtos';
import { Log } from 'src/domain/entities';
import { ILogRepository } from 'src/domain/repositories/log';

@Injectable()
export class LogCreateUseCase implements IBaseUseCase<CreateLogDto, Log> {
  constructor(private readonly logRepository: ILogRepository) {}

  async execute(dto: CreateLogDto): Promise<Log> {
    return this.logRepository.registerLog(dto);
  }
}
