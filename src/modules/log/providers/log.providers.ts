import { LOG_REPOSITORY } from 'src/domain/common/constants';
import { Log } from 'src/domain/entities';
import { ILogRepository, LogRepository } from 'src/domain/repositories/log';

export const LogProviders = [
  {
    provide: LOG_REPOSITORY,
    useValue: Log,
  },
  {
    provide: ILogRepository,
    useClass: LogRepository,
  },
];
