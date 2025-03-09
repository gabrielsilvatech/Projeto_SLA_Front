import { createBrowserHistory } from '@remix-run/router';
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import Cookies from 'js-cookie'

const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || '',
  timeout: 100000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const authToken = Cookies.get('auth');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<{ detail?: string }>): Promise<AxiosError> => {
    if (
      error.response?.data?.detail === 'Token inválido.' ||
      error.response?.data?.detail === 'Token expirado.'
    ) {
      Cookies.remove('auth');
      history.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;