import React, { useState, useEffect } from 'react';
import styles from './myPage.module.css';
import { getUserInfo } from '../../../utils/userApi';
import { getBackHistory } from '../../../utils/backhistoryApi';
import { Loading } from '../../../components/loading/Loading';
import { SelectBox } from '../../../components/box/selectBox/SelectBox';

export const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [backHistory, setBackHistory] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [loading, setLoading] = useState(true); //사용자 정보 로딩 상태
    const [formData, setFormData] = useState({
        strategy: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 사용자 정보를 받아오는 API
                const userInfoData = await getUserInfo();
                setUserInfo(userInfoData);
            } catch (error) {
                console.error('MyPage fetchData error: ', error);
            } finally {
                setLoading(false); //사용자 정보 로딩이 끝나면 false로 설정
            }
        };
        fetchData(); // fetchData 함수 실행
    }, []);

    if (loading || !userInfo) {
        return <Loading />;
    }

    //전략 변경 핸들러
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBtnClick = async () => {
        setErrorMessage(''); // 에러 메시지 초기화
        try {
            const backHistoryData = await getBackHistory(formData.strategy);
            setBackHistory(backHistoryData);
            setIsTableVisible(true);
        } catch (error) {
            if (error.response && error.response.status == 404) {
                setErrorMessage('백테스팅한 데이터가 없습니다.');
            } else {
                setErrorMessage('서버 문제 발생');
            }
            console.error('MyPage strategy fetchData error: ', error);
        }
    };

    const options_strategy = [
        { label: '골든/데드', value: 'golden' },
        { label: '볼린저밴드', value: 'bollinger' },
        { label: 'RSI, MFI, MACD 지표 이용', value: 'rsi' },
        { label: '엔벨로프', value: 'env' },
        { label: '윌리엄스', value: 'williams' },
    ];

    return (
        <div className={styles.mypage}>
            {userInfo && (
                <>
                    <div className={styles.title}>
                        <div className={styles.name}>{userInfo.name}</div>
                        <div className={styles.sub}>님의 마이페이지</div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoTitle}>회원 개인정보</div>
                        <table className={styles.tableV}>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>{userInfo.name}</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>{userInfo.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <div className={styles.info}>
                <div className={styles.infoTitle}>백테스팅 기록</div>
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
                    <button className={styles.btn} onClick={handleBtnClick}>
                        조회
                    </button>
                </div>
                {errorMessage && (
                    <>
                        <div className={styles.error}>{errorMessage}</div>
                        <div className={styles.error}>전략설정을 진행해주세요.</div>
                        <div className={styles.error}>
                            <a href="/strategy">전략설정하러 가기</a>
                        </div>
                    </>
                )}
                {!errorMessage && isTableVisible && backHistory.length > 0 && (
                    <table className={styles.tableH}>
                        <thead>
                            <tr>
                                <th>final cash</th>
                                <th>final asset</th>
                                <th>final balance</th>
                                <th>profit</th>
                                <th>profit rate</th>
                                <th>number of trades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backHistory.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.finalCash}</td>
                                    <td>{record.finalAsset}</td>
                                    <td>{record.finalBalance}</td>
                                    <td>{record.profit}</td>
                                    <td>{record.profitRate}</td>
                                    <td>{record.numberOfTrades}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
