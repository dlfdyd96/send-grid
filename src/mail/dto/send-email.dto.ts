export class SendEmailRequestDto {}

export class SendEmailResponseDto {}

/*
{
    "senderAddress": "no_reply@company.com",
    "title": "${customer_name}님 반갑습니다. ",
    "body": "귀하의 등급이 ${BEFORE_GRADE}에서 ${AFTER_GRADE}로 변경되었습니다.",
    "recipients": [
        {
            "address": "hongildong@naver_.com",
            "name": "홍길동",
            "type": "R",
            "parameters": {
                "customer_name": "홍길동",
                "BEFORE_GRADE": "SILVER",
                "AFTER_GRADE": "GOLD"
            }
        },
        {
            "address": "chulsoo@daum_.net",
            "name": null,
            "type": "R",
            "parameters": {
                "customer_name": "철수",
                "BEFORE_GRADE": "BRONZE",
                "AFTER_GRADE": "SILVER"
            }
        }
    ],
    "individual": true,
    "advertising": false
}
*/
