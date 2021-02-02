import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CommonResponseDto {
  @IsBoolean()
  status: boolean;
  @IsOptional()
  @IsString()
  error?: string;
  @IsOptional()
  @IsString()
  message?: string;
}
