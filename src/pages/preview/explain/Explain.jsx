import React from 'react';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import styles from './explain.module.css';
import { useNavigate } from 'react-router-dom';

export const Explain = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/login/');
    };

    return (
        <div className={styles.explain}>
            <div className={styles.title}>
                <div>DSL</div>
                <div>QUANT</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div>
                        김호성, 김효석, 나상연, 이민혁, 최승아 5인으로 구성된 광운대학교 DSL QUANT
                        팀입니다!
                    </div>
                    <div>이 웹사이트는 주식전략을 시뮬레이션 해볼 수 있는 웹사이트입니다.</div>
                    <div>참여하고 싶다면 시작하기 버튼을 눌러주세요.</div>
                </div>
                <div className={styles.btn}>
                    <ColorBtn text="시작하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};
