//인증 관련 context

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 사용자 정보 상태
    const [token, setToken] = useState(localStorage.getItem('jwt')); // 토큰 상태를 localStorage에서 복원

    useEffect(() => {
        const SURL = import.meta.env.VITE_APP_URI;

        const checkUser = async () => {
            if (token) {
                try {
                    // 토큰이 유효한지 확인하고, 유저 정보를 받아옵니다.
                    const response = await axios.get(`${SURL}/api/user-info`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    // 토큰이 유효하지 않으면 초기화하고 로그아웃 처리
                    localStorage.removeItem('jwt');
                    setToken(null);
                }
            }
        };
        checkUser();
    }, [token]);

    // 로그인 함수: 로그인 시 토큰을 저장하고 상태를 업데이트
    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('jwt', jwtToken); // 로컬 스토리지에 토큰 저장
    };

    // 로그아웃 함수: 로그아웃 시 토큰을 삭제하고 상태를 초기화
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('jwt'); // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('name');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const SURL = import.meta.env.VITE_APP_URI;
        const checkUser = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const response = await axios.get(`${SURL}/api/user-info`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    localStorage.removeItem('jwt');
                }
            }
        };
        checkUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('name');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
*/