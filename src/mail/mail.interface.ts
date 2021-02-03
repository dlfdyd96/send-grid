export interface MailModuleOptions {
  apiKey: string; // 네이버 클라우드 플랫폼 포털에서 발급받은 Access Key ID 값
  secret: string; // Access Key ID 값 과 Secret Key 로 암호화한 서명
  senderAddress: string; // 발송자 Email 주소. 임의의 도메인 주소 사용하셔도 됩니다만, 가능하면 발신자 소유의 도메인 Email 계정을 사용하실 것을 권고드립니다.
  language: string; // API 응답 값의 다국어 처리를 위한 값. (입력 값 예시: ko-KR, en-US, zh-CN, 기본 값:en-US)
}
