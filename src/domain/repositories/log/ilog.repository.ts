import { Inject, Injectable } from '@nestjs/common';
import { LOG_REPOSITORY } from 'src/domain/common/constants';
import { CreateLogDto } from 'src/domain/dtos';
import { Log } from '../../entities';

@Injectable()
export abstract class ILogRepository {
  @Inject(LOG_REPOSITORY)
  protected readonly logRepository: typeof Log;
  constructor() {}
  abstract registerLog(dto: CreateLogDto): Promise<Log>;
  abstract findAllLogs(): Promise<Log[]>;
}
