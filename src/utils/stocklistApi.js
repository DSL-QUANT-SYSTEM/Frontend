// 저장돼있는 주식 정보를 받아오는 API
// 항상 top 기준으로 정렬
// GET

import axios from 'axios';

const SURL = import.meta.env.VITE_APP_URI;

export const getStockListRate = async () => {
    try {
        const response = await axios.get(`${SURL}/home/coinByFluctuating`, {
            params: {
                sort: 'top', //정렬 기준
            },
        });
        return response.data;
    } catch (error) {
        console.error('getStockList error: ', error);
        throw error;
    }
};
export const getStockListClosing = async () => {
    try {
        const response = await axios.get(`${SURL}/home/coinByClosingPrice`, {
            params: {
                sort: 'top', //정렬 기준
            },
        });
        return response.data;
    } catch (error) {
        console.error('getStockList error: ', error);
        throw error;
    }
};
export const getStockListVolume = async () => {
    try {
        const response = await axios.get(`${SURL}/home/coinByTradingVolume`, {
            params: {
                sort: 'top', //정렬 기준
            },
        });
        return response.data;
    } catch (error) {
        console.error('getStockList error: ', error);
        throw error;
    }
};
