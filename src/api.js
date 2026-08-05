import axios from 'axios';

// src/api.js


const api = axios.create({
  baseURL: 'https://millitary-personnel-system-at-makutupora.onrender.com/api',
});



// Attach Django JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;