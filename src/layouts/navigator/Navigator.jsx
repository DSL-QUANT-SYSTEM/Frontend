import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import classNames from 'classnames';
import styles from './navigator.module.css';
const SURL = import.meta.env.VITE_APP_URI;

// 사용자 정보를 가져오는 API 호출 함수
const getUserInfo = async () => {
    try {
        const response = await axios.get(`${SURL}/userinfo`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        });
        return response.data; // 사용자 이름만 반환
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return null;
    }
};

export const Navigator = () => {
    const [activePage, setActivePage] = useState('');
    const [userName, setUserName] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        setActivePage(location.pathname);

        const fetchData = async () => {
            try {
                const name = await getUserInfo();
                setUserName(name);
            } catch (error) {
                console.error('Navigator fetchData error: ', error);
            }
        };
        fetchData();
    }, [location]);

    const logoutHandler = async () => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.post(
                'https:///api.dslquant.site/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            logout();
            alert('로그아웃 완료');
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 진행 도중에 오류가 발생했습니다', error);
        }
    };

    if (location.pathname !== '/' && location.pathname !== '/login') {
        return (
            <div className={styles.navigator}>
                <div>
                    <Link to="/home" className={styles.title}>
                        DSL QUANT
                    </Link>
                </div>
                <ul className={styles.menuWrapper}>
                    <li
                        className={classNames(styles.menu, {
                            [styles.active]:
                                activePage === '/stocklist' || activePage === '/stockinfo',
                        })}
                        onClick={() => navigate('/stocklist')}
                    >
                        상세정보
                    </li>
                    <li
                        className={classNames(styles.menu, {
                            [styles.active]:
                                activePage === '/strategy' ||
                                activePage === '/strategy/golden' ||
                                activePage === '/strategy/bollinger' ||
                                activePage === '/strategy/rsi' ||
                                activePage === '/strategy/env' ||
                                activePage === 'straategy/williams' ||
                                activePage.startsWith('/result'),
                        })}
                        onClick={() => navigate('/strategy')}
                    >
                        전략설정
                    </li>
                </ul>
                <div className={styles.account}>
                    <Link
                        to="/mypage"
                        onClick={() => navigate('/mypage')}
                        className={styles.accountName}
                    >
                        <p>{userName ? userName : '이름'}</p> 님
                    </Link>
                    <Link to="/" onClick={logoutHandler} className={styles.accountLogout}>
                        로그아웃
                    </Link>
                </div>
            </div>
        );
    }
    return null;
};
