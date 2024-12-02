import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateLogDto } from 'src/domain/dtos';
import { Log } from 'src/domain/entities';
import { LogFindAllUseCase } from '../use-cases/find-one/log-find-all.use-case';
import { ILogController } from './ilog.controller';

@Controller('log')
export class LogController implements ILogController {
  constructor(private readonly findAllLogsUseCase: LogFindAllUseCase) {}

  @Get()
  @ApiBearerAuth('jwt')
  @ApiResponse({
    type: Log,
    isArray: true,
    status: 200,
    description: 'Success!',
  })
  findAllLogs(): Promise<Log[]> {
    return this.findAllLogsUseCase.execute();
  }
}
