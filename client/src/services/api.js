import axios from 'axios';
import { API_URL, AUTH_STORAGE_KEY } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the stored JWT (localStorage, not a cookie) to every outgoing request
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // corrupted storage value - ignore and continue unauthenticated
    }
  }
  return config;
});

// If the token is rejected/expired, clear it so the UI falls back to logged-out state
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    return Promise.reject(error);
  }
);

export default api;
