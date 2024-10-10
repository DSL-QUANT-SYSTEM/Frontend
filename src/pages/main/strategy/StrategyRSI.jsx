import React, { useContext, useState, useEffect } from 'react';
import styles from './strategy.module.css';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyRsiDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyRSI = ({ setSubmit }) => {
    const { setStrategy3Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        rsiPeriod: 0,
    });

    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에서 숫자 부분 추출
    const pathSegments = location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1]; // 경로의 마지막 부분이 ID

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: Number(value) };

            // 입력값 검증
            if (name === 'rsiPeriod' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            // localStorage에 저장
            localStorage.setItem('rsiStrategy', JSON.stringify(newFormData));

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const SURL = import.meta.env.VITE_APP_URI;

        // localStorage에서 값 불러오기
        const savedStrategyData = localStorage.getItem('rsiStrategy');
        const strategyData = savedStrategyData ? JSON.parse(savedStrategyData) : null;

        // DTO 생성
        const strategy3DTO = strategyData ? new StrategyRsiDTO(strategyData) : null;

        if (strategy3DTO) {
            setStrategy3Data(strategy3DTO);

            try {
                const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
                const response = await axios.post(`${SURL}/strategy/rsi`, strategy3DTO, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Response:', response.data);
            } catch (error) {
                console.error('There was an error submitting the RSI strategy!', error);
            }

            if (formData.rsiPeriod) {
                navigate(`/result/${id}`);
            } else {
                alert('RSI 계산을 위한 기간을 입력해주세요.');
            }
        } else {
            alert('RSI 계산을 위한 기간을 입력해주세요.');
        }
    };

    // setSubmit에 handleSubmit 함수를 전달
    useEffect(() => {
        if (typeof setSubmit === 'function') {
            setSubmit(() => handleSubmit);
        }
    }, [setSubmit]);

    return (
        <div className={styles.strategyComponent}>
            <div className={styles.title}>RSI, MFI, MACD 지표 이용 전략 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>RSI 기간</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="RSI 기간을 입력하세요."
                        name="rsiPeriod"
                        value={formData.rsiPeriod}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
