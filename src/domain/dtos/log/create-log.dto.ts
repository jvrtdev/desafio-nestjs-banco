import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LOG_ACTION, MODEL_NAME } from 'src/domain/common/enums/log';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  modelName: MODEL_NAME.ACCOUNT;

  @IsString()
  @IsNotEmpty()
  action: LOG_ACTION;

  @IsOptional()
  @IsString()
  transactionId: string;

  @IsOptional()
  @IsNumber()
  accountId: number;
}
