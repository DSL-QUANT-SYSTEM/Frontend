//Williams 지표 이용 전략 설정 페이지

import React, { useContext, useState } from "react";
import styles from "./strategy.module.css";
import { ColorBtn } from "../../../components/button/colorBtn/ColorBtn";
import { InputBox } from "../../../components/box/inputBox/InputBox";
import { StrategyWDTO } from "../../../types/StrategyDTO";
import { StrategyContext } from "../../../context/StrategyContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const StrategyWilliams = () => {
    const { setStrategyWilData } = useContext(StrategyContext);
    const initialFormDataWil = JSON.parse(localStorage.getItem("formDataWil")) || {
        williamsPeriod: 0,
    };
    const [formDataWil, setFormDataWil] = useState(initialFormDataWil);

    const navigate = useNavigate();
    const location = useLocation();

    // strategy/ 이후의 경로를 모두 ID로 추출
    const pathSegments = location.pathname.split("/strategy/");
    const id = pathSegments[1]; // 'strategy/' 이후의 모든 부분이 ID

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataWil((prevData) => {
            const newFormDataWil = { ...prevData, [name]: Number(value) };

            if (name === "williamsPeriod" && parseFloat(value) < 0) {
                alert("입력값은 0보다 작을 수 없습니다.");
                return prevData;
            }

            localStorage.setItem("formDataWil", JSON.stringify(newFormDataWil));

            return newFormDataWil;
        });
    };

    const handleSubmit = async () => {
        const SURL = import.meta.env.VITE_APP_URI;
        const strategyWilDTO = new StrategyWDTO(formDataWil);
        // console.log(strategyWilDTO);
        setStrategyWilData(strategyWilDTO);

        try {
            const token = localStorage.getItem("jwt"); // JWT 토큰 가져오기
            const response = await axios.post(`${SURL}/strategy/williams`, strategyWilDTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('Response:', response.data);
        } catch (error) {
            console.error("There was an error submitting the common strategy!", error);
        }

        if (formDataWil.williamsPeriod) {
            localStorage.removeItem("formDataWil");
            navigate(`/result/${id}`);
        } else {
            if (!formDataWil.williamsPeriod) {
                alert("Williams 데이터를 입력해주세요.(기본값은 14입니다.)");
            }
        }
    };

    const handlePrevClick = () => {
        navigate("/strategy");
    };

    return (
        <div className={styles.strategy}>
            <div
                className={styles.title}
                title="시장의 과매도 및 과매수 상태를 판단하기 위해 사용되는 기술적 분석 지표"
            >
                Williams 지표 이용 전략 설정 페이지
            </div>
            <div className={styles.info}>
                해당 옵션에 대해서 잘 모르시겠다면 제목에 커서를 갖다두시면 설명해드립니다:)
            </div>
            <div className={styles.select}>
                <div
                    className={styles.subtitle}
                    title="주식의 단기 가격 변동을 반영하기 위해 짧은 기간(예: 5일, 10일 등) 동안의 평균 가격을 계산하는 데 사용되는 기간"
                >
                    빠른 이동 평균 기간
                </div>
                <div className={styles.input}>
                    <InputBox
                        type="text"
                        placeholder="Williams 기간을 입력하세요."
                        name="williamsPeriod"
                        value={formDataWil.williamsPeriod}
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
