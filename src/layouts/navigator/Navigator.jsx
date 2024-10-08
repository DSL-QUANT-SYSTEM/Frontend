import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import classNames from "classnames";
import styles from "./navigator.module.css";

const SURL = import.meta.env.VITE_APP_URI;

export const Navigator = () => {
    const [activePage, setActivePage] = useState("");
    const [userName, setUserName] = useState("");
    const { token, logout } = useContext(AuthContext); // AuthContext에서 token과 logout 가져오기
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActivePage(location.pathname);

        const fetchData = async () => {
            if (token) {
                // 토큰이 있을 때만 사용자 정보 요청
                try {
                    const response = await axios.get(`${SURL}/userinfo`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserName(response.data);
                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                }
            }
        };
        fetchData();
    }, [location, token]); // 토큰이 변경되거나 위치가 바뀔 때마다 다시 요청

    const logoutHandler = async () => {
        try {
            await axios.post(
                `${SURL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            logout(); // AuthContext에서 로그아웃 처리
            alert("로그아웃 완료");
            navigate("/login/");
        } catch (error) {
            console.error("로그아웃 진행 도중에 오류가 발생했습니다", error);
        }
    };

    if (location.pathname !== "/" && location.pathname !== "/login/") {
        return (
            <div className={styles.navigator}>
                <div>
                    <Link to="/home/" className={styles.title}>
                        DSL QUANT
                    </Link>
                </div>
                <ul className={styles.menuWrapper}>
                    <li
                        className={classNames(styles.menu, {
                            [styles.active]:
                                activePage === "/stocklist/" || activePage.startsWith("/stockinfo"),
                        })}
                        onClick={() => navigate("/stocklist/")}
                    >
                        상세정보
                    </li>
                    <li
                        className={classNames(styles.menu, {
                            [styles.active]:
                                activePage.startsWith("/strategy") ||
                                activePage.startsWith("/result"),
                        })}
                        onClick={() => navigate("/strategy/")}
                    >
                        전략설정
                    </li>
                </ul>
                <div className={styles.account}>
                    <Link
                        to="/mypage/"
                        onClick={() => navigate("/mypage/")}
                        className={styles.accountName}
                    >
                        <p>{userName ? userName : "이름"}</p> 님
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
