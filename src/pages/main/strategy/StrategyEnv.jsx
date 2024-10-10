import React, { useContext, useState, useEffect } from 'react';
import styles from './strategy.module.css';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyEnvDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyEnv = ({ setSubmit }) => {
    const SURL = import.meta.env.VITE_APP_URI;

    const { setStrategy4Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        moving_up: '',
        moving_down: '',
        movingAveragePeriod: 0,
    });

    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에서 숫자 부분 추출
    const pathSegments = location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1]; // 경로의 마지막 부분이 ID

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value };

            // 입력값 검증
            if (
                (name === 'moving_up' ||
                    name === 'moving_down' ||
                    name === 'movingAveragePeriod') &&
                parseFloat(value) < 0
            ) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            // localStorage에 저장
            localStorage.setItem('envStrategy', JSON.stringify(newFormData));

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        // localStorage에서 값 불러오기
        const savedStrategyData = localStorage.getItem('envStrategy');
        const strategyData = savedStrategyData ? JSON.parse(savedStrategyData) : null;

        // DTO 생성
        const strategy4DTO = strategyData ? new StrategyEnvDTO(strategyData) : null;

        if (strategy4DTO) {
            setStrategy4Data(strategy4DTO);

            try {
                const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
                const response = await axios.post(`${SURL}/strategy/env`, strategy4DTO, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Response:', response.data);
            } catch (error) {
                console.error('There was an error submitting the envelope strategy!', error);
            }

            if (
                strategyData.moving_up &&
                strategyData.moving_down &&
                strategyData.movingAveragePeriod
            ) {
                navigate(`/result/${id}`);
            } else {
                alert('모든 옵션을 선택해주세요');
            }
        } else {
            alert('모든 옵션을 선택해주세요');
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
            <div className={styles.title}>엔벨로프 전략 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>상단 폭 값</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="상단폭 값을 입력해주세요(기본값 1)"
                        name="moving_up"
                        value={formData.moving_up}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>하단 폭 값</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="하단폭 값을 입력해주세요(기본값 1)"
                        name="moving_down"
                        value={formData.moving_down}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>기간 값</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="기간 값을 입력해주세요(기본값 20)"
                        name="movingAveragePeriod"
                        value={formData.movingAveragePeriod}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
