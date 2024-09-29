import axios from 'axios';

// Axios Interceptor 설정
axios.interceptors.request.use(
  (config) => {
    // 매번 최신 토큰을 로컬 스토리지에서 가져옴
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;