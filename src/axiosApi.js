import axios from 'axios';

const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL + "/api/v1",
});

axiosApi.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(storedToken)}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosApi;
