// 코스닥 1년치 정보 받아오는 API
// GET

import axios from 'axios';

const SURL = import.meta.env.VITE_APP_URI;

export const getTop20 = async () => {
    try {
        const response = await axios.get(`${SURL}/home/top20`);
        return response.data;
    } catch (error) {
        console.error('getTop20 error: ', error);
        throw error;
    }
};
