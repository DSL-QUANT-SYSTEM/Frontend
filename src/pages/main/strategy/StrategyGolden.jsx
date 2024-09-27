//골든/데드 전략페이지

import React, { useContext, useState } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyGoldenDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyGolden = () => {
    const SURL = import.meta.env.VITE_APP_URI;

    const { setStrategy1Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        //골든
        fastMoveAvg: 0,
        slowMoveAvg: 0,
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

            if (name === 'fastMoveAvg' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            if (name === 'slowMoveAvg' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const strategy1DTO = new StrategyGoldenDTO(formData);
        // console.log(strategy1DTO);
        setStrategy1Data(strategy1DTO);

        try {
            const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기
            const response = await axios.post(`${SURL}/strategy/golden`, strategy1DTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error submitting the golden/dead cross strategy!', error);
        }

        if (formData.fastMoveAvg && formData.slowMoveAvg) {
            navigate(`/result/${id}`);
        } else {
            if (!formData.fastMoveAvg || !formData.slowMoveAvg) {
                alert('이동 평균 기간을 입력해주세요.');
            }
        }
    };

    const handlePrevClick = () => {
        navigate('/strategy');
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>골든/데드 전략 설정 페이지</div>
            <div className={styles.select}>
                <div className={styles.subtitle}>빠른 이동 평균 기간</div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="빠른 이동 평균 기간을 입력하세요."
                        name="fastMoveAvg"
                        value={formData.fastMoveAvg}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.select}>
                <div className={styles.subtitle}>느린 이동 평균 기간</div>

                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="느린 이동 평균 기간을 입력하세요."
                        name="slowMoveAvg"
                        value={formData.slowMoveAvg}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnPrev} text="< 이전" onClick={handlePrevClick} />
                <ColorBtn className={styles.btnNext} text="백테스트" onClick={handleSubmit} />
            </div>
        </div>
    );
};
