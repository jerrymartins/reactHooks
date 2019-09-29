import environment from 'environment';
import axios from "axios";

const api = axios.create({
    baseURL: environment.api.api_url
});

api.interceptors.request.use(async config => {
    const token = 'token';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
