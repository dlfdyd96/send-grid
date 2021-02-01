# NestJS 메일 발송 Dynamic Module

NestJS Dynamic Module을 이용하여 Naver Cloud Platform 메일 발송 ✉ 서비스 모듈 예제를 만들어 봅니다.

## Index

- Dynamic Module 이란,
- 설정
- 코드
- 느낀점

<hr>

## Dynamic Module 이란

### Module이란

NestJS에서 `Module`은 애플리케이션 구조를 구성(organize)하는데 사용됩니다.
NestJS의 모듈은 기본적으로 싱글톤 패턴입니다. 같은 프로바이더 인스턴스(Service, Gateway, ...)를 많은 모듈에서 쉽게 공유되어 사용할 수 있습니다.
NestJS의 `Module`은 전체 Application의 모듈형 부분으로, 적합한 Providers 및 Controllers와 같은 구성요소 그룹을 정의합니다.
NestJS 모듈은 1) 정적 모듈과 2) 동적 모듈 두 가지로 분류됩니다.

<br>

### 정적모듈

정적 모듈은 NestJS가 필요한 모든 정보를 미리 호스트 및 consuming 모듈에서 선언하여 사용합니다.

<br>

### 동적모듈

동적 모듈은 모듈 등록과 Provider를 동적으로 설정이 가능한 커스텀 가능한 모듈을 쉽게 만들 수 있게 합니다.

정적 모듈 바인딩에서 불가능했던 상황들이 있습니다. 개발환경에 맞춰 서버 포트번호를 다르게 부여해야하는 등 다양한 상황에서 동적 바인딩은 말그대로 **동적**으로 상황에 맞게 Module을 커스텀할 수 있게 해줍니다.

<hr>

## Example


우리의 예제에서는 메일 발송을 위한 모듈을 만들어 볼 것 입니다. API Key를 발급받아 환경변수에 설정하고, 이에 맞춰 Module을 동적으로 설정해봅시다.

### TODO List 📋
- [ ] Naver Cloud Platform - Cloud Outbound Mailer API 발급
- [ ] Set up NestJS Mail Module
  - [ ] install package
  - [ ] Configure Enviornment Variables
  - [ ] Generate Module
  - [ ] Make Dynamic Moudle
- [ ] Test

<br>

#### 1. Naver Cloud Platform - Cloud Outbound Mailer API 발급
- Naver Cloud Platform에 접속하여 Cloud Out bound Mailer 이용신청을 합니다.
![ncp](./images/ncp.png)
- `마이페이지` - `인증키 관리` 로 API 인증키를 발급합니다.
![ncp2](./images/ncp2.png)

#### 2.Set up NestJS Mail Module
- `@nestjs/cli` 페키지를 설치하여 프로젝트를 생성해줍니다.
  ```sh
  $ npm i -g @nestjs/cli
  $ nest new mail-service-project
  $ npm i
  ```
- Mail module 하나를 생성해줍니다.
  ```sh
  $ nest generate module mail
  ```
#### 3.install package
- Cloud Outbound Mailer API 서비스는 RESTful 형태로 제공되기 때문에, `axios` package를 설치하여 api를 요청해봅니다.
  ```sh
  $ npm i axios # 다른 http package를 써도 됩니다.
  ```
- 또한 발급받은 API키를 환경변수로 사용하기 위해 `ConfigModule`를 설치하고, `Joi` data validator를 사용합니다. ([Joi](https://www.npmjs.com/package/joi)는 Config와 써보고 싶었는데, 이번에 같이 사용해보겠습니다.)
  ```sh
  $ npm i --save @nestjs/config
  $ npm i joi
  ```
#### 4.Configure Enviornment Variables
- 환경 변수를 설정해줄 `.env` 파일을 `package.json` 파일이 있는 디렉토리에 생성해줍니다.
  ```env
  # .env

  # NAVER CLOUD PLATFORM
  ACCESS_KEY_ID=퍼블릭키
  SECRET_KEY=쉿!비밀키ㅎ
  SENDER_ADDRESS=1yongs_@naver.com
  ```
- `app.module.ts`에 `ConfigModule`을 `.forRoot()` static method를 통해 root로 import 해줍니다. ([공식문서](https://docs.nestjs.com/techniques/configuration#service))
  ```ts
  // src/app.module.ts
  import { Module } from '@nestjs/common';
  import { ConfigModule } from '@nestjs/config';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import * as Joi from 'joi';

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env`,
        validationSchema: Joi.object({
          ACCESS_KEY_ID: Joi.string().required(),
          SECRET_KEY: Joi.string().required(),
          SENDER_ADDRESS: Joi.string().required(),
        }),
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  ```

#### 5.Generate Module
- 
#### 6.Make Dynamic Moudle
#### 7.Test