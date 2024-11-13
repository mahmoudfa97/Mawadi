import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const get = <T>(url: string, params?: object, role?: string) =>
  api.get<T>(url, {
    params,
    headers: role ? { role } : {},
  });

export const post = <T>(url: string, data: object, role?: string) =>
  api.post<T>(url, data, {
    headers: role ? { role } : {},
  });

export const put = <T>(url: string, data: object, role?: string) =>
  api.put<T>(url, data, {
    headers: role ? { role } : {},
  });

export const del = <T>(url: string, role?: string) =>
  api.delete<T>(url, {
    headers: role ? { role } : {},
  });

export default api;
