import axios from 'axios';
import Cookies from 'js-cookie';
let api;

if (import.meta.env.PROD) {
    api = axios.create({
        baseURL: 'https://react-django-blog-0axx.onrender.com',
        headers: {
            'Content-Type': 'application/json',
        },
    });
} else {
    api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

axios.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
