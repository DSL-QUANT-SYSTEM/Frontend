//주식 참고 자료 박스
import React from 'react';
import styles from './chartBox.module.css';

export const ChartBox = ({ title, currency, price, arrow, rate, chart }) => {
    return (
        <div className={styles.chartBox}>
            <div className={styles.text}>
                <div className={styles.title}>{title}</div>
                <div className={styles.money}>
                    {currency} {price} {arrow} {rate}
                </div>
            </div>
            <div className={styles.chart}>{chart}</div>
        </div>
    );
};
