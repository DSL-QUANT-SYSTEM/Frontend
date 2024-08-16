import React, { useContext } from 'react';
import './result.css';
import { StrategyContext } from '../../../context/StrategyContext';
import { useParams } from 'react-router-dom';

export const Result = () => {
    const { strategyCommonData, strategy1Data, strategy2Data, strategy3Data } = useContext(StrategyContext);
    const { id } = useParams(); // URL에서 id를 추출합니다.

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
        <div className="result">
            <div className="result-title">
                <div className="result-title-name">최승아</div>
                <div className="result-title-content">님의 전략선택옵션</div>
            </div>
            <div className="result-info">
                <div className="result-info-title">공통 전략 데이터</div>
                <table className="result-info-table">
                    <tbody>
                        {Object.entries(strategyCommonData).map(([key, value]) => (
                            <tr key={key}>
                                <th>{key}</th>
                                <td>{JSON.stringify(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="result-info-title">
                    선택 전략 <p>{id}</p> 데이터
                </div>
                <table className="result-info-table">
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
                    </tbody>
                </table>
            </div>
            <div className="result-title">
                <div className="result-title-name">최승아</div>
                <div className="result-title-content">님의 백테스팅 결과</div>
            </div>
            <div className="result-explain">
                <div>해당 분석 결과를 추후에도 확인하고 싶다면 아래의 html로 저장하기 버튼을 눌러주세요</div>
                <div>파일 분석 팁💡💡</div>
                <div className="result-explain-download" onClick={saveHtml}>
                    HTML로 저장하기
                </div>
            </div>
        </div>
    );
};
