import { IsBoolean, IsString, ValidateNested } from 'class-validator';

export class RecipientParameter {
  @IsString()
  customer_name: string;
  @IsString()
  BEFORE_GRADE: string;
  @IsString()
  AFTER_GRADE: string;
}

export class Recipients {
  @IsString()
  address: string;
  @IsString()
  name: string;
  @IsString()
  type: string;
  @ValidateNested()
  parameters: RecipientParameter;
}

export class RecipientForRequestDto {
  @IsString()
  senderAddress: string;
  @IsString()
  title: string;
  @IsString()
  body: string;
  @ValidateNested()
  recipients: Recipients[];
  @IsBoolean()
  individual: boolean; // 개인발송여부 (개인발송 시 참조인, 숨은참조 무시됨)
  @IsBoolean()
  advertising: boolean; // 	광고메일여부
}
