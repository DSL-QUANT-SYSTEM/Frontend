import React from 'react';
import Chart from 'react-apexcharts';
import styles from './chart.module.css';
import { Loading } from '../loading/Loading';

export const LineChart = ({ title, dataKey, chartData }) => {
    // chartData가 비어있거나 undefined일 때 처리
    if (!Array.isArray(chartData) || chartData.length === 0) {
        return <Loading />;
    }

    const length = chartData.length; // 데이터 길이 저장

    // 각 데이터 항목에서 특정 속성의 최대값과 최소값 계산
    const maxHighest = Math.max(...chartData.map((entry) => entry.high));
    const minLowest = Math.min(...chartData.map((entry) => entry.low));
    const maxClose = Math.max(...chartData.map((entry) => entry.close));
    const minClose = Math.min(...chartData.map((entry) => entry.close));

    // y축 범위를 조절하기 위한 일정 값 설정
    const range = 0.05;

    // 데이터 포맷팅 (ApexCharts에서 사용하는 형식으로 변환)
    const data = chartData.map((entry) => ({
        x: entry.date ? new Date(entry.date).getTime() : new Date().getTime(), // 날짜를 타임스탬프로 변환
        y: entry[dataKey], // 캔들차트 데이터 형식
        meta: { ...entry }, // 메타데이터 추가
    }));

    const options = {
        chart: {
            type: 'area',
            height: '100%',
            animations: {
                enabled: false,
            },
            zoom: {
                enabled: true, // 확대/축소 기능 활성화
                type: 'x', // 확대/축소 유형: x와 y축 모두
                autoScaleYaxis: true, // 확대 시 y축 자동 스케일링
            },
            toolbar: {
                tools: {
                    selection: true,
                    zoom: true,
                    zoomin: false,
                    zoomout: false,
                    pan: true,
                    reset: true,
                    customIcons: [
                        {
                            icon: '<div class="icon">1Y</div>', // 사용자 정의 아이콘 (1년)
                            index: 1,
                            title: '1 Year',
                            click: function (chart) {
                                chart.zoomX(
                                    new Date(
                                        new Date().setFullYear(new Date().getFullYear() - 1),
                                    ).getTime(),
                                    new Date().getTime(),
                                );
                            },
                        },
                        {
                            icon: '<div class="icon">6M</div>', // 사용자 정의 아이콘 (6개월)
                            index: 2,
                            title: '6 Month',
                            click: function (chart) {
                                chart.zoomX(
                                    new Date(
                                        new Date().setMonth(new Date().getMonth() - 6),
                                    ).getTime(),
                                    new Date().getTime(),
                                );
                            },
                        },
                        {
                            icon: '<div class="icon">3M</div>', // 사용자 정의 아이콘 (3개월)
                            index: 3,
                            title: '3 Month',
                            click: function (chart) {
                                chart.zoomX(
                                    new Date(
                                        new Date().setMonth(new Date().getMonth() - 3),
                                    ).getTime(),
                                    new Date().getTime(),
                                );
                            },
                        },
                        {
                            icon: '<div class="icon">1M</div>', // 사용자 정의 아이콘 (1개월)
                            index: 4,
                            title: '1 Month',
                            click: function (chart) {
                                chart.zoomX(
                                    new Date(
                                        new Date().setMonth(new Date().getMonth() - 1),
                                    ).getTime(),
                                    new Date().getTime(),
                                );
                            },
                        },
                        {
                            icon: '<div class="icon">1W</div>', // 사용자 정의 아이콘 (1주일)
                            index: 5,
                            title: '1 Week',
                            click: function (chart) {
                                chart.zoomX(
                                    new Date(
                                        new Date().setDate(new Date().getDate() - 7),
                                    ).getTime(),
                                    new Date().getTime(),
                                );
                            },
                        },
                    ],
                },
            },
            // 최대 확대 범위는 일주일로 설정
            events: {
                zoomed: function (chartContext, { xaxis }) {
                    const minX = xaxis.min;
                    const maxX = xaxis.max;
                    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1주일을 밀리초로 변환

                    if (maxX - minX < oneWeek) {
                        chartContext.zoomX(minX, minX + oneWeek);
                    }
                },
            },
        },
        title: {
            text: title,
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'MM/dd',
            },
        },
        yaxis: {
            min: minLowest - range,
            max: maxHighest + range,
            show: false,
        },
        tooltip: {
            x: {
                format: 'yy/MM',
                show: false,
            },
            custom: function ({ seriesIndex, dataPointIndex, w }) {
                const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex].meta;
                const date = data.date ? new Date(data.date).toLocaleDateString() : 'N/A';

                return `<div class="tooltip">
                          <div><strong>Date:</strong> ${date}</div>
                          <div><strong>Open:</strong> ${data.open}</div>
                          <div><strong>Close:</strong> ${data.close}</div>
                          <div><strong>Highest:</strong> ${data.high}</div>
                          <div><strong>Lowest:</strong> ${data.low}</div>
                          <div><strong>Volume:</strong> ${data.volume}</div>
                        </div>`;
            },
        },
        dataLabels: {
            enabled: false,
        },
        annotations: {
            yaxis: [
                {
                    y: chartData[chartData.length - 2][dataKey],
                    borderColor: 'var(--color-3)',
                    strokeDashArray: 'var(--stroke-dash-array)',
                },
            ],
        },
        stroke: {
            curve: 'straight',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        markers: {
            size: 0,
        },
        colors: [
            chartData[1][dataKey] < chartData[0][dataKey] ? 'var(--up-color)' : 'var(--down-color)',
        ],
    };

    return (
        <div className={styles.chart}>
            <Chart options={options} series={[{ name: dataKey, data }]} type="area" height="100%" />
        </div>
    );
};

// 최대 종가 계산 함수
export const MaxClose = ({ chartData }) => {
    return Math.max(...chartData.map((entry) => entry.close));
};

// 최소 종가 계산 함수
export const MinClose = ({ chartData }) => {
    return Math.min(...chartData.map((entry) => entry.close));
};
