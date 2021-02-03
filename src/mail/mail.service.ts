import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { createHmac } from 'crypto';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
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

  async sendEmail(reqData: SendEmailRequestDto): Promise<SendEmailResponseDto> {
    const url = `/api/v1/mails`;
    const method = `POST`;
    try {
      const { data } = await axios.post<{ requestId: string; count: number }>(
        `${process.env.MAIL_API_DOMAIN}${url}`,
        {
          senderAddress: this.options.senderAddress,
          ...reqData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
            'x-ncp-iam-access-key': this.options.apiKey,
            'x-ncp-apigw-signature-v2': this.makeSignature(
              method,
              url,
              new Date().getTime().toString(),
              this.options.apiKey,
              this.options.secret,
            ),
            'x-ncp-lang': this.options.language,
          },
        },
      );

      return {
        ...data,
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error: error.response.data,
        message: `메일 발송에 실패하였습니다.`,
      };
    }
  }

  private makeSignature(
    method: string,
    url: string,
    timestamp: string,
    accessKey: string,
    secretKey: string,
  ): string {
    const space = ' '; // 공백
    const newLine = '\n'; // 줄바꿈

    const hmac = createHmac('sha256', secretKey);

    hmac.write(method);
    hmac.write(space);
    hmac.write(url);
    hmac.write(newLine);
    hmac.write(timestamp);
    hmac.write(newLine);
    hmac.write(accessKey);

    hmac.end();

    return Buffer.from(hmac.read()).toString('base64');
  }
}
