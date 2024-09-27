import React, { useEffect, useContext } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Loading } from '../../../components/loading/Loading';

export const LoginHandler = (props) => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code'); //  인가 코드를 추출
    const { login } = useContext(AuthContext);
    const SURL = import.meta.env.VITE_APP_URI;

    // 인가코드를 백엔드로 보내는 코드
    useEffect(() => {
        const kakaoLogin = async () => {
            // 인가 코드가 없을 경우
            if (!code) {
                console.error('Authorization code not found');
                return;
            }

            try {
                // 백엔드로 인가 코드 전송
                const res = await axios.get(`${SURL}/login/oauth2/code/kakao`, {
                    params: { code: code },
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Origin': '*',
                    },
                });

                // 응답 데이터 확인
                // console.log("Response Headers:", res.headers);
                // console.log("Response Data:", res.data);

                // JWT 토큰이 응답 데이터에 있는지 확인
                const jwt = res.data.jwtToken;
                // JWT 토큰이 있다면 로컬 스토리지에 저장하고 홈으로 이동
                if (jwt) {
                    localStorage.setItem('jwt', jwt);
                    localStorage.setItem('name', res.data.account.username);
                    localStorage.setItem('refreshToken', res.data.refreshToken);

                    // AuthContext의 login 함수 호출하여 사용자 정보 업데이트
                    login(res.data.account);

                    navigate('/home');
                } else {
                    console.error('JWT token not found in response data');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            }
        };
        kakaoLogin();
    }, [navigate, code, login]);

    return (
        <div className={styles.loading}>
            <Loading />
        </div>
    );
};
