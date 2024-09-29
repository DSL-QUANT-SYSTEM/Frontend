//Williams 지표 이용 전략 설정 페이지

import React, { useContext, useState, useEffect } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyWDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyWilliams = ({ setSubmit }) => {
    const { setStrategy5Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        williamsPeriod: 0,
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

            if (name === 'williamsPeriod' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const SURL = import.meta.env.VITE_APP_URI;
        const strategy5DTO = new StrategyWDTO(formData);
        // console.log(strategy5DTO);
        setStrategy5Data(strategy5DTO);

        try {
            const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
            const response = await axios.post(`${SURL}/strategy/williams`, strategy5DTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error submitting the common strategy!', error);
        }

        if (formData.williamsPeriod) {
            navigate(`/result/${id}`);
        } else {
            if (!formData.williamsPeriod) {
                alert('Williams 데이터를 입력해주세요.(기본값은 14입니다.)');
            }
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
            <div className={styles.title}>Williams %R 지표 이용 전략 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>빠른 이동 평균 기간</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="Williams 기간을 입력하세요."
                        name="williamsPeriod"
                        value={formData.williamsPeriod}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
