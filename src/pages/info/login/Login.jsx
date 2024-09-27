import React from 'react';
import styles from './login.module.css';
import { ImgBtn } from '../../../components/button/imgBtn/ImgBtn';
import KakaoLoginLogo from '../../../assets/kakao_login_medium_wide.png';

export const Login = () => {
    const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY_KAKAO;
    const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI_KAKAO;
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 로그인 페이지로 이동
    const kakaoHandler = () => {
        window.open(KAKAO_AUTH_URI, '_self');
    };

    return (
        <div className={styles.login}>
            <div className={styles.box}>
                <div className={styles.title}>로그인</div>
                <div className={styles.btn}>
                    <ImgBtn onClick={kakaoHandler} imageSrc={KakaoLoginLogo} alt="kakao" />
                </div>
            </div>
        </div>
    );
};
