import { string } from 'joi';

export interface MailModuleOptions {
  apiKey: string; // 네이버 클라우드 플랫폼 포털에서 발급받은 Access Key ID 값
  secret: string; // Access Key ID 값 과 Secret Key 로 암호화한 서명
  senderAddress: string; // 발송자 Email 주소. 임의의 도메인 주소 사용하셔도 됩니다만, 가능하면 발신자 소유의 도메인 Email 계정을 사용하실 것을 권고드립니다.
  language: string; // API 응답 값의 다국어 처리를 위한 값. (입력 값 예시: ko-KR, en-US, zh-CN, 기본 값:en-US)
}

export interface MailRequestHeaders {
  'x-ncp-apigw-timestamp': number; // 1970년 1월 1일 00:00:00 협정 세계시(UTC)부터의 경과 시간을 밀리초(Millisecond)로 나타내며 API Gateway 서버와 시간 차가 5분 이상 나는 경우 유효하지 않은 요청으로 간주
  // x-ncp-apigw-timestamp:{Timestamp} (Timestamp example: 1521787414578)
  'x-ncp-iam-access-key': string; // 네이버 클라우드 플랫폼 포털에서 발급받은 Access Key ID 값
  //x-ncp-iam-access-key:{Account Access Key}
  'x-ncp-apigw-signature-v2': string; // Access Key ID 값 과 Secret Key 로 암호화한 서명
  // x-ncp-apigw-signature-v2:{API Gateway Signature}
  'x-ncp-lang': string; // API 응답 값의 다국어 처리를 위한 값. (입력 값 예시: ko-KR, en-US, zh-CN, 기본 값:en-US)
  //x-ncp-lang:{language code}
}
