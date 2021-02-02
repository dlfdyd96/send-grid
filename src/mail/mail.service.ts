import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { RecipientForRequestDto } from './dto/recipient-for-req.dto';
import {
  SendEmailRequestDto,
  SendEmailResponseDto,
} from './dto/send-email.dto';
import { MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    reqData: SendEmailRequestDto,
  ): Promise<SendEmailResponseDto> {
    try {
      const response = await axios.post<{ requestId: string; count: number }>(
        `${process.env.MAIL_API_BASE_URL}/`,
        {
          senderAddress: this.options.senderAddress,
          ...reqData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
            'x-ncp-iam-access-key': this.options.apiKey,
            'x-ncp-apigw-signature-v2': Buffer.from(
              `${this.options.secret}`,
            ).toString('base64'),
            'x-ncp-lang': this.options.language,
          },
        },
      );
      return {
        ...response,
        status: true,
      };
    } catch (error) {
      console.log(error.response);
      return {
        status: false,
        error: error.response.data,
        message: `메일 발소에에 실패하였습니다.`,
      };
    }
  }
}
