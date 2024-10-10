//공통전략설정 및 전략 선택 페이지

import React, { useContext, useState } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { SelectBox } from '../../../components/box/selectBox/SelectBox';
import { StrategyCommonDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const StrategyMain = () => {
    const SURL = import.meta.env.VITE_APP_URI;
    const { setStrategyCommonData } = useContext(StrategyContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        initial_investment: 0,
        tax: 0.01,
        target_item: '',
        tick_kind: '',
        inq_range: 0,
        strategy: '',
    });

    const options_tax = [
        { label: '0.01%', value: '0.01' },
        { label: '0.02%', value: '0.02' },
        { label: '0.03%', value: '0.03' },
        { label: '0.04%', value: '0.04' },
        { label: '0.05%', value: '0.05' },
        { label: '0.06%', value: '0.06' },
        { label: '0.07%', value: '0.07' },
        { label: '0.08%', value: '0.08' },
        { label: '0.09%', value: '0.09' },
        { label: '0.1%', value: '0.1' },
    ];
    const options_candle = [
        { label: '1분', value: '1' },
        { label: '3분', value: '3' },
        { label: '5분', value: '5' },
        { label: '10분', value: '10' },
        { label: '15분', value: '15' },
        { label: '30분', value: '30' },
        { label: '60분', value: '60' },
        { label: '240분', value: '240' },
        { label: '1일', value: 'D' },
        { label: '1주', value: 'W' },
        { label: '1개월', value: 'M' },
    ];
    const options_strategy = [
        { label: '골든/데드', value: 'strategy/golden' },
        { label: '볼린저밴드', value: 'strategy/bollinger' },
        { label: 'RSI, MFI, MACD 지표 이용', value: 'strategy/rsi' },
        { label: '엔벨로프', value: 'strategy/env' },
        { label: '윌리엄스', value: 'strategy/williams' },
        { label: '복수선택', value: 'strategy/select' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value };

            if (name === 'initial_investment' && parseFloat(value) < 0) {
                alert('초기 투자 금액은 0보다 작을 수 없습니다.');
                return prevData;
            }

            if (name === 'inq_range' && parseFloat(value) < 0) {
                alert('조회 범위는 0보다 작을 수 없습니다.');
                return prevData;
            }

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        // 현재 시간을 추가합니다.
        const currentTime = new Date();

        // ISO 형식: "YYYY-MM-DD HH:MM:SS"
        const year = currentTime.getFullYear();
        const month = String(currentTime.getMonth() + 1).padStart(2, '0');
        const day = String(currentTime.getDate()).padStart(2, '0');
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentTime.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // formData에 포맷된 시간을 추가하여 새로운 객체로 만듭니다.
        const formDataWithTime = {
            ...formData,
            backtesting_date: formattedDate, // ISO 형식으로 변환하여 시간을 보냅니다.
        };
        const strategyCommonDTO = new StrategyCommonDTO(formDataWithTime);

        setStrategyCommonData(strategyCommonDTO);

        try {
            const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
            const response = await axios.post(`${SURL}/strategy`, strategyCommonDTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 다양한 가능성으로 헤더 값 확인
            const newToken =
                response.headers['Authorization'] ||
                response.headers['authorization'] ||
                response.headers['Authorization'.toLowerCase()];

            if (newToken) {
                localStorage.setItem('jwt', newToken); // 새로운 토큰 저장
            } else {
                console.warn('New token not found in the response headers');
            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error submitting the common strategy!', error);
        }

        // 선택된 전략의 value 값을 가져옵니다.
        const selectedStrategy = formData.strategy;

        // 선택된 전략이 있으면 해당 주소로 이동합니다.
        if (
            selectedStrategy &&
            formData.initial_investment &&
            formData.tax &&
            formData.target_item &&
            formData.tick_kind &&
            formData.inq_range
        ) {
            navigate(`/${selectedStrategy}`);
        } else {
            if (
                !selectedStrategy ||
                !formData.initial_investment ||
                !formData.tax ||
                !formData.target_item ||
                !formData.tick_kind ||
                !formData.inq_range
            ) {
                alert('선택되지 않은 옵션이 있습니다\n모든 옵션을 선택해주세요');
            }
        }
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>공통 변수 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>초기 투자 금액</div>
                <div className={styles.input}>
                    <div className={styles.initInvestment}>
                        <InputBox
                            type="text"
                            placeholder="초기 투자 금액을 입력해주세요."
                            name="initial_investment"
                            value={formData.initial_investment}
                            onChange={handleChange}
                        />
                    </div>
                    <span>만원</span>
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>거래 수수료</div>
                <div className={styles.input}>
                    <SelectBox
                        placeholder="거래 수수료를 선택해주세요."
                        options={options_tax}
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>종목 이름(TargetItem)</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="종목 이름을 정확히 입력하세요."
                        name="target_item"
                        value={formData.target_item}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>캔들 종류(TickKind)</div>
                <div className={styles.input}>
                    <SelectBox
                        placeholder="캔들 종류를 선택해주세요."
                        options={options_candle}
                        name="tick_kind"
                        value={formData.tick_kind}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>조회 범위(InqRange)</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="조회 범위를 입력하세요."
                        name="inq_range"
                        value={formData.inq_range}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.titleSecond}>전략 선택</div>
            <div className={styles.select}>
                <div className={styles.input}>
                    <SelectBox
                        placeholder="전략을 선택하세요."
                        options={options_strategy}
                        name="strategy"
                        value={formData.strategy}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnNext} text="세부 전략 선택" onClick={handleSubmit} />
            </div>
        </div>
    );
};
