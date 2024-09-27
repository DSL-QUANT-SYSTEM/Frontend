import axios from 'axios';

const SURL = import.meta.env.VITE_APP_URI;
// GET 요청 보내기
axios

    .get(`${SURL}`)
    .then((response) => {
        // 응답 데이터를 처리합니다.
        // console.log(response.data);
    })
    .catch((error) => {
        // 오류 처리를 수행합니다.
        console.error('There was a problem with the request:', error);
    });

// POST 요청 보내기
axios
    .post(`${SURL}`, { key: 'value' })
    .then((response) => {
        // 응답 데이터를 처리합니다.
        // console.log(response.data);
    })
    .catch((error) => {
        // 오류 처리를 수행합니다.
        console.error('There was a problem with the request:', error);
    });
