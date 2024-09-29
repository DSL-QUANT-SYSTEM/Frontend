//엔벨로프 전략페이지

import React, { useContext, useState } from 'react';
import styles from './strategy.module.css';
import { ColorBtn } from '../../../components/button/colorBtn/ColorBtn';
import { InputBox } from '../../../components/box/inputBox/InputBox';
import { StrategyEnvDTO } from '../../../types/StrategyDTO';
import { StrategyContext } from '../../../context/StrategyContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export const StrategyEnv = () => {
    const SURL = import.meta.env.VITE_APP_URI;

    const { setStrategy4Data } = useContext(StrategyContext);
    const [formData, setFormData] = useState({
        //골든
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
            const newFormData = { ...prevData, [name]: Number(value) };

            if (name === 'moving_up' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            if (name === 'moving_down' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            if (name === 'movingAveragePeriod' && parseFloat(value) < 0) {
                alert('입력값은 0보다 작을 수 없습니다.');
                return prevData;
            }

            return newFormData;
        });
    };

    const handleSubmit = async () => {
        const strategy4DTO = new StrategyEnvDTO(formData);
        // console.log(strategy4DTO);
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

        if (formData.moving_up && formData.moving_down && formData.movingAveragePeriod) {
            navigate(`/result/${id}`);
        } else {
            if (!formData.moving_up || !formData.moving_down || !formData.movingAveragePeriod) {
                alert('선택되지 않은 옵션이 있습니다\n모든 옵션을 선택해주세요');
            }
        }
    };

    const handlePrevClick = () => {
        navigate('/strategy');
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.title}>엔벨로프 전략 설정 페이지</div>
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
            <div className={styles.btnWrapper}>
                <ColorBtn className={styles.btnPrev} text="< 이전" onClick={handlePrevClick} />
                <ColorBtn className={styles.btnNext} text="백테스트" onClick={handleSubmit} />
            </div>
        </div>
    );
};
