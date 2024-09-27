// 상단 참고 주식 자료 구조
import React, { useEffect, useState } from 'react';
import styles from './featuredInfo.module.css';
import { ArrowDown, ArrowUp } from '../emoticon/Arrow';
import { ChartBox } from '../box/chartBox/ChartBox';
import { LineChart } from '../chart/LineChart';
import { Loading } from '../loading/Loading';
import { getKosdaq } from '../../utils/kosdakApi';
import { getKospi } from '../../utils/kospiApi';
import { getKospi200 } from '../../utils/kospi200Api';

export const FeaturedInfo = () => {
    //API를 통해 받아온 데이터를 저장
    const [kospi, setKospi] = useState(null);
    const [kosdaq, setKosdaq] = useState(null);
    const [kospi200, setKospi200] = useState(null);

    //API를 통해 데이터를 받아오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const kospiData = await getKospi();
                setKospi(kospiData);

                const kosdaqData = await getKosdaq();
                setKosdaq(kosdaqData);

                const kospi200Data = await getKospi200();
                setKospi200(kospi200Data);
            } catch (error) {
                console.error('FeaturedInfo fetchData error: ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.featuredInfo}>
            <div className={styles.box}>
                {!kosdaq ? (
                    <Loading />
                ) : (
                    <ChartBox
                        title="코스닥"
                        currency="₩"
                        price={kosdaq[0].closingPrice}
                        arrow={kosdaq.fluctuatingRate >= 0 ? <ArrowUp /> : <ArrowDown />}
                        rate={kosdaq[0].fluctuatingRate}
                        chart={
                            <LineChart
                                dataKey="close"
                                chartData={kosdaq.map((item) => ({
                                    open: item.openingPrice,
                                    close: item.closingPrice,
                                    high: item.highPrice,
                                    low: item.lowPrice,
                                    volume: item.tradingVolume,
                                    rate: item.fluctuatingRate,
                                    date: item.date || '', // date가 없을 경우 빈 문자열
                                }))}
                            />
                        }
                    />
                )}
            </div>
            <div className={styles.box}>
                {!kospi ? (
                    <Loading />
                ) : (
                    <ChartBox
                        title="코스피"
                        currency="₩"
                        price={kospi[0].closingPrice}
                        arrow={kospi.fluctuatingRate >= 0 ? <ArrowUp /> : <ArrowDown />}
                        rate={kospi[0].fluctuatingRate}
                        chart={
                            <LineChart
                                dataKey="close"
                                chartData={kospi.map((item) => ({
                                    open: item.openingPrice,
                                    close: item.closingPrice,
                                    high: item.highPrice,
                                    low: item.lowPrice,
                                    volume: item.tradingVolume,
                                    rate: item.fluctuatingRate,
                                    date: item.date || ' ',
                                }))}
                            />
                        }
                    />
                )}
            </div>

            <div className={styles.box}>
                {!kospi200 ? (
                    <Loading />
                ) : (
                    <ChartBox
                        title="코스피200"
                        currency="₩"
                        price={kospi200[0].closingPrice}
                        arrow={kospi200.fluctuatingRate >= 0 ? <ArrowUp /> : <ArrowDown />}
                        rate={kospi200[0].fluctuatingRate}
                        chart={
                            <LineChart
                                dataKey="close"
                                chartData={kospi200.map((item) => ({
                                    open: item.openingPrice,
                                    close: item.closingPrice,
                                    high: item.highPrice,
                                    low: item.lowPrice,
                                    volume: item.tradingVolume,
                                    rate: item.fluctuatingRate,
                                    date: item.date || ' ',
                                }))}
                            />
                        }
                    />
                )}
            </div>
        </div>
    );
};
