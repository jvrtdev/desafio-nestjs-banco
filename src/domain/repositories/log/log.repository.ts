import { Injectable } from '@nestjs/common';
import { CreateLogDto } from 'src/domain/dtos';
import { Log } from 'src/domain/entities';
import { ILogRepository } from './ilog.repository';

@Injectable()
export class LogRepository extends ILogRepository {
  registerLog(dto: CreateLogDto): Promise<Log> {
    return this.logRepository.create(dto);
  }

  findAllLogs(): Promise<Log[]> {
    return this.logRepository.findAll({
      include: { all: true },
      order: [['created_at', 'DESC']],
    });
  }
}
