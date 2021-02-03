import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  SendEmailRequestDto,
  SendEmailResponseDto,
} from './mail/dto/send-email.dto';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Post('/mail')
  sendToClient(
    @Body() reqData: SendEmailRequestDto,
  ): Promise<SendEmailResponseDto> {
    return this.mailService.sendEmail(reqData);
  }
}
