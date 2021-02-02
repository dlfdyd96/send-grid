import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto/common.dto';
import { RecipientForRequestDto } from './recipient-for-req.dto';

export class SendEmailRequestDto {
  @IsString()
  senderName: string;
  @IsString()
  title: string;
  @IsString()
  body: string;
  @ValidateNested()
  recipients: RecipientForRequestDto[];
}

export class SendEmailResponseDto extends CommonResponseDto {
  @IsOptional()
  @IsString()
  requestId?: string;
  @IsOptional()
  @IsString()
  count?: number;
}
