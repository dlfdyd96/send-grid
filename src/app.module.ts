import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        ACCESS_KEY_ID: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
        SENDER_ADDRESS: Joi.string().required(),
        MAIL_API_DOMAIN: Joi.string().required(),
      }),
    }),
    MailModule.forRoot({
      apiKey: process.env.ACCESS_KEY_ID,
      secret: process.env.SECRET_KEY,
      senderAddress: process.env.SENDER_ADDRESS,
      language: 'ko-KR', // 한국어
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
