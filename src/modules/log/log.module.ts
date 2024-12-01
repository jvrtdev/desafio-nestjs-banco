import { Module } from '@nestjs/common';
import { LogController } from './controllers/log.controller';
import { LogProviders } from './providers/log.providers';
import { LogCreateUseCase } from './use-cases/create/log-create.use-case';
import { LogFindAllUseCase } from './use-cases/find-one/log-find-all.use-case';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [LogFindAllUseCase, LogCreateUseCase, ...LogProviders],
  exports: [LogFindAllUseCase, LogCreateUseCase],
})
export class LogModule {}
