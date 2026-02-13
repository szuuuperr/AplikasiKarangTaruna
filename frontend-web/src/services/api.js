import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('tukangkita_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authAPI = {
    login: (data) => API.post('/auth/login', data),
    register: (data) => API.post('/auth/register', data)
};

export const tutorialAPI = {
    getAll: () => API.get('/tutorials'),
    getById: (id) => API.get(`/tutorials/${id}`)
};

export default API;
