import React from "react";
import Chart from "react-apexcharts";
import styles from "./chart.module.css";
import "./chart.css";
import { Loading } from "../loading/Loading";

export const CandleChart = ({ title, dataKey, chartData }) => {
    if (!Array.isArray(chartData) || chartData.length === 0) {
        return <Loading />;
    }

    const maxHighest = Math.max(...chartData.map((entry) => entry.high));
    const minLowest = Math.min(...chartData.map((entry) => entry.low));
    const maxVolume = Math.max(...chartData.map((entry) => entry.volume));

    const range = 1000;

    // 데이터 포맷팅 (ApexCharts에서 사용하는 형식으로 변환)
    const candleData = chartData.map((entry) => ({
        x: entry.date ? new Date(entry.date).getTime() : new Date().getTime(), // 날짜를 타임스탬프로 변환
        y: entry[dataKey], // 캔들차트 데이터 형식
        meta: { ...entry }, // 메타데이터 추가
    }));

    const volumeData = chartData.map((entry) => ({
        x: new Date(entry.date).getTime(),
        y: entry.volume,
        meta: { ...entry },
    }));

    const options = {
        chart: {
            type: "candlestick", // 차트 타입: 캔들차트
            height: "100%", // 차트 높이
            animations: {
                enabled: false, // 애니메이션 비활성화
            },
            zoom: {
                enabled: true, // 확대/축소 기능 활성화
                type: "x", // 확대/축소 유형: x축
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
                            title: "1 Year",

                            click: function (chart, options, e) {
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
                            title: "6 Month",

                            click: function (chart, options, e) {
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
                            title: "3 Month",

                            click: function (chart, options, e) {
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
                            title: "1 Month",

                            click: function (chart, options, e) {
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
                            title: "1 Week",

                            click: function (chart, options, e) {
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
            text: title, // 차트 제목
            align: "left", // 제목 정렬: 왼쪽
        },
        xaxis: {
            type: "datetime", // x축 타입: 날짜/시간
            labels: {
                format: "MM/dd", // 날짜 형식 설정
            },
        },
        yaxis: [
            {
                min: minLowest - range, // y축 최소값
                max: maxHighest + range, // y축 최대값
                show: false,
                tooltip: {
                    enabled: true,
                },
            },
            {
                opposite: true,
                show: false,
                max: maxVolume * 20, // 거래량 y축 최대값 설정
                min: 0,
            },
        ],
        tooltip: {
            shared: true, // 툴팁 공유
            x: {
                format: "yy/MM", // 툴팁 날짜 포맷
                show: false,
            },
            custom: function ({ seriesIndex, dataPointIndex, w }) {
                const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex].meta;
                const date = data.date ? new Date(data.date).toLocaleDateString() : "N/A";

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
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: true, // 심지 색상 채우기 여부
                },
                colors: {
                    upward: "var(--up-color)", // 상승 시 색상
                    downward: "var(--down-color)", // 하락 시 색상
                },
            },
            bar: {
                colors: {
                    ranges: [
                        {
                            from: 0,
                            to: Number.MAX_SAFE_INTEGER,
                            color: "gray",
                        },
                    ],
                },
                strokeColor: "gray",
            },
        },
    };

    return (
        <div className={styles.chart}>
            <Chart
                options={options}
                series={[
                    { name: "Candlestick", type: "candlestick", data: candleData },
                    { name: "Volume", type: "bar", data: volumeData, yAxisIndex: 1 },
                ]}
                type="candlestick"
                height="100%"
            />
        </div>
    );
};
