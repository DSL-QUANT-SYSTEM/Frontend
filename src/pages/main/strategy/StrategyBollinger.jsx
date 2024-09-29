//볼린저밴드 전략페이지

import React, { useContext, useState, useEffect } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyBollingerDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyBollinger = ({ setSubmit }) => {
    const { setStrategy2Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        move_period: [0, 0],
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

            if (name === 'moveAvg' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const SURL = import.meta.env.VITE_APP_URI;
        const strategy2DTO = new StrategyBollingerDTO(formData);
        // console.log(strategy2DTO);
        setStrategy2Data(strategy2DTO);

        try {
            const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
            const response = await axios.post(`${SURL}/strategy/bollinger`, strategy2DTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error submitting the common strategy!', error);
        }

        if (formData.moveAvg) {
            navigate(`/result/${id}`);
        } else {
            alert('이동 평균 기간을 입력해주세요.');
        }
    };

    // setSubmit에 handleSubmit 함수를 전달
    useEffect(() => {
        if (typeof setSubmit === 'function') {
            setSubmit(() => handleSubmit);
        }
    }, [setSubmit]);

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>볼린저밴드 전략 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>이동 평균 기간</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="이동 평균 기간을 입력하세요."
                        name="moveAvg"
                        value={formData.moveAvg}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
