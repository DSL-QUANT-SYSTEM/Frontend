import React, { useContext, useState, useEffect } from 'react';
import styles from './strategy.module.css';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyWDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useLocation } from 'react-router-dom';
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

            // 입력값 검증
            if (name === 'williamsPeriod' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            // localStorage에 저장
            localStorage.setItem('williamsStrategy', JSON.stringify(newFormData));

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const SURL = import.meta.env.VITE_APP_URI;

        // localStorage에서 값 불러오기
        const savedStrategyData = localStorage.getItem('williamsStrategy');
        const strategyData = savedStrategyData ? JSON.parse(savedStrategyData) : null;

        // DTO 생성
        const strategy5DTO = strategyData ? new StrategyWDTO(strategyData) : null;

        if (strategy5DTO) {
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
                console.error('There was an error submitting the Williams strategy!', error);
            }

            if (formData.williamsPeriod) {
                navigate(`/result/${id}`);
            } else {
                alert('Williams 데이터를 입력해주세요.(기본값은 14입니다.)');
            }
        } else {
            alert('Williams 데이터를 입력해주세요.(기본값은 14입니다.)');
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
            <div className={styles.title}>Williams %R 지표 이용 전략 설정</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>Williams 기간</div>
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
