import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/common/base/use-case';
import { Log } from 'src/domain/entities';
import { ILogRepository } from 'src/domain/repositories/log';
import { RedisService } from 'src/infrastructure/redis/redis.service';

@Injectable()
export class LogFindAllUseCase implements IBaseUseCase<null, Log[]> {
  constructor(
    private readonly logRepository: ILogRepository,
    private readonly redisService: RedisService,
  ) {}

  private cacheKey = 'logs:findAll';

  async execute(): Promise<Log[]> {
    const cachedData = await this.redisService.get<Log[]>(this.cacheKey);

    if (cachedData) return cachedData;

    const data = await this.logRepository.findAllLogs();

    await this.redisService.set(this.cacheKey, data, 30);

    return data;
  }
}
