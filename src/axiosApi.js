import axios from 'axios';

const storedToken = localStorage.getItem('token');

const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL + "/api/v1", 
    headers: {
        'Authorization': storedToken ? `Bearer ${JSON.parse(storedToken)}` : '',
    },
});

export default axiosApi;