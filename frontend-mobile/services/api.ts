import axios from 'axios';

let authToken: string | null = null;

export const setToken = (token: string | null) => { authToken = token; };
export const getToken = () => authToken;

const API = axios.create({ baseURL: 'http://192.168.1.9:5000/api' });

API.interceptors.request.use((config) => {
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

export const authAPI = {
    login: (data: { email: string; password: string }) => API.post('/auth/login', data),
    register: (data: { fullname: string; email: string; password: string }) => API.post('/auth/register', data),
};

export const tutorialAPI = {
    getAll: () => API.get('/tutorials'),
    getById: (id: string) => API.get(`/tutorials/${id}`),
};

export default API;
