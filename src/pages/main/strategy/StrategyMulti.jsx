import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StrategyGolden } from './StrategyGolden';
import { StrategyBollinger } from './StrategyBollinger';
import { StrategyRSI } from './StrategyRSI';
import { StrategyEnv } from './StrategyEnv';
import { StrategyWilliams } from './StrategyWilliams';

export const StrategyMulti = () => {
    const { strategy1, strategy2 } = useParams();

    // 두 전략의 handleSubmit을 모두 호출하는 함수
    const handleBackBtnClick = (submitBollinger, submitEnv) => {
        if (submitBollinger) {
            submitBollinger();
        }
        if (submitEnv) {
            submitEnv();
        }
    };

    const renderStrategy = (strategy, setSubmitHandler) => {
        switch (strategy) {
            case 'golden':
                return <StrategyGolden />;
            case 'bolinger':
                return <StrategyBollinger onSubmit={setSubmitHandler} />;
            case 'rsi':
                return <StrategyRSI />;
            case 'env':
                return <StrategyEnv onSubmit={setSubmitHandler} />;
            case 'williams':
                return <StrategyWilliams />;
            default:
                return null;
        }
    };

    const [submitBollinger, setSubmitBollinger] = useState(null);
    const [submitEnv, setSubmitEnv] = useState(null);

    return (
        <div>
            <div>{renderStrategy(strategy1, setSubmitBollinger)}</div>
            <div>{renderStrategy(strategy2, setSubmitEnv)}</div>
            <div>
                <button onClick={() => handleBackBtnClick(submitBollinger, submitEnv)}>
                    Back and Submit
                </button>
            </div>
        </div>
    );
};
