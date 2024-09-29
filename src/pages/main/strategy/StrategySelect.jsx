// 복수 선택시 두개의 전략 비율을 선택하는 컴포넌트
import React, { useContext, useState } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

export const StrategySelect = () => {
    const [strategy1, setStrategy1] = useState({ id: '', value: '' });
    const [strategy2, setStrategy2] = useState({ id: '', value: '' });
    const [sliderValue, setSliderValue] = useState(50);

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

    const handleSubmit = async () => {
        if (!strategy1.id || !strategy2.id) {
            alert('전략을 선택해주세요.');
            return;
        }
        navigate(`/strategy/${strategy1.id}/${strategy2.id}`);
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>복수 전략 선택</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>전략-1 선택</div>
                <div className={styles.radioWrapper}>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="golden"
                            name="strategy1"
                            value="골든/데드"
                            onChange={handleStrategyChange}
                        />
                        <p>골든/데드</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="bolinger"
                            name="strategy1"
                            value="볼린저밴드"
                            onChange={handleStrategyChange}
                        />
                        <p>볼린저밴드</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="rsi"
                            name="strategy1"
                            value="RSI,MFI,MACD 지표 이용"
                            onChange={handleStrategyChange}
                        />
                        <p>RSI,MFI,MACD 지표 이용</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="env"
                            name="strategy1"
                            value="엔벨로프"
                            onChange={handleStrategyChange}
                        />
                        <p>엔벨로프</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="williams"
                            name="strategy1"
                            value="윌리엄스"
                            onChange={handleStrategyChange}
                        />
                        <p>윌리엄스</p>
                    </div>
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>전략-2 선택</div>
                <div className={styles.radioWrapper}>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="golden"
                            name="strategy2"
                            value="골든/데드"
                            onChange={handleStrategyChange}
                        />
                        <p>골든/데드</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="bolinger"
                            name="strategy2"
                            value="볼린저밴드"
                            onChange={handleStrategyChange}
                        />
                        <p>볼린저밴드</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="rsi"
                            name="strategy2"
                            value="RSI,MFI,MACD 지표 이용"
                            onChange={handleStrategyChange}
                        />
                        <p>RSI,MFI,MACD 지표 이용</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="env"
                            name="strategy2"
                            value="엔벨로프"
                            onChange={handleStrategyChange}
                        />
                        <p>엔벨로프</p>
                    </div>
                    <div className={styles.radio}>
                        <input
                            type="radio"
                            id="williams"
                            name="strategy2"
                            value="윌리엄스"
                            onChange={handleStrategyChange}
                        />
                        <p>윌리엄스</p>
                    </div>
                </div>
            </div>
            <div className={styles.titleSecond}>전략 비율 선택</div>
            <div className={styles.selectedWrapper}>
                <div className={styles.selectedContentWrapper}>
                    <div className={styles.selectedTitle}>{strategy1.value}</div>
                    <div className={styles.selectedContent}>{sliderValue}%</div>
                </div>
                <div className={styles.selectedContentWrapper}>
                    <div className={styles.selectedTitle}>{strategy2.value}</div>
                    <div className={styles.selectedContent}>{100 - sliderValue}%</div>
                </div>
            </div>
            <Box className={styles.box}>
                <Slider
                    sx={{
                        '& .MuiSlider-root': {
                            margin: 0, // 전체 margin 제거
                            padding: 0, // 패딩 제거
                        },
                        '& .MuiSlider-rail': {
                            height: 4, // 레일의 높이 조정 (필요시)
                            backgroundColor: 'var(--color-3)',
                        },
                        '& .MuiSlider-track': {
                            height: 8, // 트랙의 높이 조정 (필요시)
                            backgroundColor: 'var(--point-color-2)',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            height: 24, // thumb 높이 조정 (필요시)
                            width: 24, // thumb 너비 조정 (필요시)
                            backgroundColor: 'var(--main-color)',
                        },
                        '& .MuiSlider-valueLabel': {
                            border: '1px solid var(--main-color)',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--color-white)',
                        },
                    }}
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) =>
                        `${strategy1.value}-${value}%, ${strategy2.value}-${100 - value}%`
                    }
                    step={10}
                    // marks
                    min={0}
                    max={100}
                    onChange={(e, value) => setSliderValue(value)}
                />
            </Box>

            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnNext} text="세부 전략 선택" onClick={handleSubmit} />
            </div>
        </div>
    );
};
