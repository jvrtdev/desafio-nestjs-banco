import { Log } from 'src/domain/entities';

export interface ILogController {
  findAllLogs(): Promise<Log[]>;
}
