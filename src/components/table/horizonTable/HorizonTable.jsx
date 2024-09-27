import React, { useState, useEffect } from 'react';
import styles from './horizonTable.module.css';
import { getTop20 } from '../../../utils/top20Api';
import { Loading } from '../../loading/Loading';

export const HorizonTableTop20 = ({ title }) => {
    const [top20, setTop20] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const top20Data = await getTop20();
                setTop20(top20Data);
            } catch (error) {
                console.error('Top20 fetchData error: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.horizonTableTop20}>
            <div className={styles.title}>{title}</div>
            {loading ? (
                <Loading />
            ) : top20 && top20.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>변동</th>
                            <th>등락률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top20.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className={styles.dataText}> {data.market}</td>
                                <td className={styles.dataNum}>
                                    {data.closingPrice ? data.closingPrice.toLocaleString() : '-'}
                                </td>
                                <td
                                    className={`${styles.dataNum} ${data.fluctuatingRate > 0 ? styles.positive : styles.negative}`}
                                >
                                    {data.fluctuatingRate
                                        ? data.fluctuatingRate.toLocaleString()
                                        : '-'}
                                </td>
                                <td
                                    className={`${styles.dataNum} ${data.fluctuatingRate > 0 ? styles.positive : styles.negative}`}
                                >
                                    {(data.fluctuatingRate * 100).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>데이터가 없습니다.</div>
            )}
        </div>
    );
};
