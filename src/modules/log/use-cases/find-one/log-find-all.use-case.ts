import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { Log } from 'src/domain/entities';
import { ILogRepository } from 'src/domain/repositories/log';

@Injectable()
export class LogFindAllUseCase implements IBaseUseCase<null, Log[]> {
  constructor(private readonly logRepository: ILogRepository) {}

  async execute(): Promise<Log[]> {
    return this.logRepository.findAllLogs();
  }
}
