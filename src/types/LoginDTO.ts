/**
 * 카카오 로그인 응답 데이터를 캡슐화하는 클래스
 */
export class KakaoLoginResponseDTO {
    /**
     * 카카오 로그인 응답 DTO 생성자
     * @param {string} code - 카카오에서 전달받은 코드
     * @param {string} [kakaoName] - 사용자의 카카오 이름 (선택적)
     * @param {string} [email] - 사용자의 이메일 (선택적)
     */
    constructor(
        public code: string,
        public kakaoName: string = '',
        public email: string = '',
    ) {}
}
