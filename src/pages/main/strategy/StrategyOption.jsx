import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { StrategyGolden } from './StrategyGolden';
import { StrategyBollinger } from './StrategyBollinger';
import { StrategyRSI } from './StrategyRSI';
import { StrategyEnv } from './StrategyEnv';
import { StrategyWilliams } from './StrategyWilliams';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';

export const StrategyOption = () => {
    const { strategy1, strategy2 } = useParams(); // URL에서 전략을 가져옴
    const navigate = useNavigate();

    // submit1, submit2를 상태로 추가
    const [submit1, setSubmit1] = useState(null);
    const [submit2, setSubmit2] = useState(null);

    //  각 전략을 렌더링하고 submit 핸들러를 설정하는 함수
    const renderStrategy = (strategy, setSubmitHandler) => {
        switch (strategy) {
            case 'golden':
                return <StrategyGolden setSubmit={setSubmitHandler} />;
            case 'bollinger':
                return <StrategyBollinger setSubmit={setSubmitHandler} />;
            case 'rsi':
                return <StrategyRSI setSubmit={setSubmitHandler} />;
            case 'env':
                return <StrategyEnv setSubmit={setSubmitHandler} />;
            case 'williams':
                return <StrategyWilliams setSubmit={setSubmitHandler} />;
            default:
                return null;
        }
    };

    // 이전 버튼 클릭 시 전략 목록 페이지로 이동
    const handlePrevClick = () => {
        navigate('/strategy/');
    };

    // 백테스트 버튼 클릭 시 두 전략의 submit 함수를 실행
    const handleSubmit = async () => {
        if (typeof submit1 === 'function') {
            submit1(); // 첫 번째 전략의 submit 함수 호출
        }
        if (typeof submit2 === 'function') {
            submit2(); // 두 번째 전략의 submit 함수 호출
        }
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.strategy1}>{renderStrategy(strategy1, setSubmit1)}</div>
            {strategy2 && (
                <div className={styles.strategy2}>{renderStrategy(strategy2, setSubmit2)}</div>
            )}
            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnPrev} text="< 이전" onClick={handlePrevClick} />
                <ColorBtn className={styles.btnNext} text="백테스트" onClick={handleSubmit} />
            </div>
        </div>
    );
};
