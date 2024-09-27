import React, { useContext, useEffect } from 'react';
import styles from './result.module.css';
import { StrategyContext } from '../../../context/StrategyContext';
import { useParams } from 'react-router-dom';

export const Result = () => {
    const {
        strategyCommonData,
        strategy1Data,
        strategy2Data,
        strategy3Data,
        strategy4Data,
        strategy5Data,
        resultData,
        setResultData,
    } = useContext(StrategyContext);
    const { id } = useParams(); // URL에서 id를 추출합니다.
    const SURL = import.meta.env.VITE_APP_URI;

    useEffect(() => {
        // localStorage에서 토큰을 가져옵니다.
        const token = localStorage.getItem('jwt');

        fetch(`${SURL}/result/${id}`, {
            // 백엔드의 정확한 URL을 사용합니다.`
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then((data) => {
                setResultData(data);
                // console.log('Updated resultData:', data); // 상태 업데이트 후 로그 추가
            })
            .catch((error) => {
                console.error('백엔드에서 결과 데이터를 가져오는 중 오류가 발생했습니다:', error);
            });
    }, [id]);

    // HTML 콘텐츠를 저장하는 함수
    const saveHtml = () => {
        // Navigator 제거
        // const navigatorElement = document.querySelector('.navigator');
        // if (navigatorElement) {
        //     navigatorElement.style.display = 'none';
        // }

        // 이벤트 비활성화
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            * {
                pointer-events: none !important;
                user-select: none !important;
            }
        `;
        document.head.appendChild(style);

        const htmlContent = document.documentElement.outerHTML;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `result_${timestamp}.html`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // 다운로드 링크를 생성
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Navigator 복구
        // if (navigatorElement) {
        //     navigatorElement.style.display = '';
        // }

        // 이벤트 복구
        document.head.removeChild(style);
    };

    return (
        <div className={styles.result}>
            <div className={styles.title}>
                <div className={styles.name}>최승아</div>
                <div className={styles.sub}>님의 전략선택옵션</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.infoTitle}>공통 전략 데이터</div>
                <table className={styles.table}>
                    <tbody>
                        {Object.entries(strategyCommonData).map(([key, value]) => (
                            <tr key={key}>
                                <th>{key}</th>
                                <td>{JSON.stringify(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.infoTitle}>
                    선택 전략 <p>{id}</p> 데이터
                </div>
                <table className={styles.table}>
                    <tbody>
                        {id === 'golden' &&
                            Object.entries(strategy1Data).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            ))}
                        {id === 'bollinger' &&
                            Object.entries(strategy2Data).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            ))}
                        {id === 'rsi' &&
                            Object.entries(strategy3Data).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            ))}
                        {id === 'env' &&
                            Object.entries(strategy4Data).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            ))}
                        {id === 'williams' &&
                            Object.entries(strategy5Data).map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.title}>
                <div className={styles.name}>최승아</div>
                <div className={styles.sub}>님의 백테스팅 결과</div>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Final Cash</th>
                        <td>{resultData?.finalCash ?? 'Loading...'}</td>
                    </tr>
                    <tr>
                        <th>Final Asset</th>
                        <td>{resultData?.finalAsset ?? 'Loading...'}</td>
                    </tr>
                    <tr>
                        <th>Final Balance</th>
                        <td>{resultData?.finalBalance ?? 'Loading...'}</td>
                    </tr>
                    <tr>
                        <th>Profit</th>
                        <td>{resultData?.profit ?? 'Loading...'}</td>
                    </tr>
                    <tr>
                        <th>Profit Rate</th>
                        <td>{resultData?.profitRate ?? 'Loading...'}</td>
                    </tr>
                    <tr>
                        <th>Number of Trades</th>
                        <td>{resultData?.numberOfTrades ?? 'Loading...'}</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.box}>
                <div>
                    해당 분석 결과를 추후에도 확인하고 싶다면 아래의 html로 저장하기 버튼을
                    눌러주세요
                </div>
                <div>파일 분석 팁💡💡</div>
                <div className={styles.download} onClick={saveHtml}>
                    HTML로 저장하기
                </div>
            </div>
        </div>
    );
};
