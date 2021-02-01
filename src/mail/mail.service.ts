import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(subject: string[], content: string) {
    const response = await axios.post(
      `${process.env.MAIL_API_BASE_URL}/`,
      {
        senderAddress: this.options.senderAddress,
        senderName: `ilyong Hwang`,
        title: `테스트!`,
        body: content,
        recipients: [
          {
            address: 'hongildong@naver_.com',
            name: '홍길동',
            type: 'R',
            parameters: {
              customer_name: '홍길동',
              BEFORE_GRADE: 'SILVER',
              AFTER_GRADE: 'GOLD',
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
          'x-ncp-iam-access-key': this.options.apiKey,
          'x-ncp-apigw-signature-v2': Buffer.from(
            `api:${this.options.secret}`,
          ).toString('base64'),
          'x-ncp-lang': this.options.language,
        },
      },
    );
  }
}
