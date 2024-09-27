// 복수 선택시 두개의 전략 비율을 선택하는 컴포넌트
import React, { useContext, useState } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export const StrategySelect = () => {
    const [strategy1, setStrategy1] = useState({ id: '', value: '' });
    const [strategy2, setStrategy2] = useState({ id: '', value: '' });

    const navigate = useNavigate();

    const handleStrategyChange = (e) => {
        const { name, value, id } = e.target;
        if (name === 'strategy1') {
            if (id === strategy2.id) {
                alert('전략-1과 전략-2는 동일할 수 없습니다.');
                setStrategy1({ id: '', value: '' });

                return;
            }
            setStrategy1({ id, value });
        } else if (name === 'strategy2') {
            if (id === strategy1.id) {
                alert('전략-1과 전략-2는 동일할 수 없습니다.');
                setStrategy2({ id: '', value: '' });
                return;
            }
            setStrategy2({ id, value });
        }
    };

    const valuetext = (value) => {
        return `${value}%`;
    };

    const handleSubmit = async () => {
        if (!strategy1.id || !strategy2.id) {
            alert('전략을 선택해주세요.');
            return;
        }
        navigate(`/strategy/multi/${strategy1.id}/${strategy2.id}`);
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>복수 전략 선택</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>전략-1 선택</div>
                <input
                    type="radio"
                    id="golden"
                    name="strategy1"
                    value="골든/데드"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                골든/데드
                <input
                    type="radio"
                    id="bolinger"
                    name="strategy1"
                    value="볼린저밴드"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                볼린저밴드
                <input
                    type="radio"
                    id="rsi"
                    name="strategy1"
                    value="RSI,MFI,MACD 지표 이용"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                RSI,MFI,MACD 지표 이용
                <input
                    type="radio"
                    id="env"
                    name="strategy1"
                    value="엔벨로프"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                엔벨로프
                <input
                    type="radio"
                    id="williams"
                    name="strategy1"
                    value="윌리엄스"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                윌리엄스
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>전략-2 선택</div>
                <input
                    type="radio"
                    id="golden"
                    name="strategy2"
                    value="골든/데드"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                골든/데드
                <input
                    type="radio"
                    id="bolinger"
                    name="strategy2"
                    value="볼린저밴드"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                볼린저밴드
                <input
                    type="radio"
                    id="rsi"
                    name="strategy2"
                    value="RSI,MFI,MACD 지표 이용"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                RSI,MFI,MACD 지표 이용
                <input
                    type="radio"
                    id="env"
                    name="strategy2"
                    value="엔벨로프"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                엔벨로프
                <input
                    type="radio"
                    id="williams"
                    name="strategy2"
                    value="윌리엄스"
                    className={styles.radio}
                    onChange={handleStrategyChange}
                />
                윌리엄스
            </div>
            <div>
                <div className={styles.title}>전략 비율 선택</div>
                <div className={styles.selectedWrapper}>
                    <div className={styles.selected}>{strategy1.value}</div>
                    <div className={styles.selected}>{strategy2.value}</div>
                </div>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={100}
                />
            </div>
            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnNext} text="세부 전략 선택" onClick={handleSubmit} />
            </div>
        </div>
    );
};
