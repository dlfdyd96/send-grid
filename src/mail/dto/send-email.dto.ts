import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto/common.dto';

export class Recipients {
  @IsString()
  address: string;
  @IsString()
  name: string;
  @IsString()
  type: string;
}

export class SendEmailRequestDto {
  @IsString()
  senderName: string;
  @IsString()
  title: string;
  @IsString()
  body: string;
  @ValidateNested({ each: true })
  @Type(() => Recipients)
  recipients: Recipients[];
}

export class SendEmailResponseDto extends CommonResponseDto {
  @IsOptional()
  @IsString()
  requestId?: string;
  @IsOptional()
  @IsString()
  count?: number;
}
