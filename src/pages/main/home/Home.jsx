import React, { useState, useEffect } from 'react';
import { FeaturedInfo } from '../../../components/featuredInfo/FeaturedInfo';
import styles from './home.module.css';
import { HorizonTableTop20 } from '../../../components/table/horizonTable/HorizonTable';
import { ArrowDown, ArrowUp } from '../../../components/emoticon/Arrow';
import { ChartBox } from '../../../components/box/chartBox/ChartBox';
import { LineChart } from '../../../components/chart/LineChart';
import { userData01 } from '../../../data/dummyData01';

export const Home = () => {
    return (
        <div className={styles.home}>
            <FeaturedInfo />
            <div className={styles.wrapper}>
                <div className={styles.backTest}>
                    <div className={styles.title}>백테스팅 결과</div>
                    <div className={styles.backChart}>
                        <ChartBox
                            title="최근 주식 종목"
                            currency="₩"
                            price="73,700"
                            arrow={<ArrowDown />}
                            rate="-1"
                            chart={<LineChart data={userData01} dataKey="lowest" />}
                            sub="Compared to last month"
                        />
                    </div>
                </div>
                <div className={styles.table}>
                    <div className={styles.title}>TOP 20 종목</div>
                    <HorizonTableTop20 />
                </div>
            </div>
        </div>
    );
};
