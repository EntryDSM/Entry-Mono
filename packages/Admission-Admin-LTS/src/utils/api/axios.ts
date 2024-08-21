import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';
import { ReissueToken } from './user';
import { ADMIN_URL, AUTH_URL } from '@/constant/env';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

const cookie = new Cookies();

instance.interceptors.request.use(
  (config) => {
    const accessToken = cookie.get('accessToken');
    const returnConfig = {
      ...config,
    };
    if (accessToken) {
      returnConfig.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return returnConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { config } = error;
      const refreshToken = cookie.get('refreshToken');

      if (
        error.response.data.message === 'Invalid Token' ||
        error.response.data.message === 'Expired Token' ||
        error.response.data.message === 'User Not Found'
      ) {
        const originalRequest = config;

        if (refreshToken) {
          ReissueToken(refreshToken)
            .then((res) => {
              cookie.set('accessToken', res.accessToken, { path: '/' });
              cookie.set('refreshToken', res.refreshToken, { path: '/' });
              if (originalRequest) {
                if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
                return axios(originalRequest);
              }
            })
            .catch(() => {
              cookie.remove('accessToken');
              cookie.remove('refreshToken');
              window.location.replace(`${AUTH_URL}/admin-login?redirect_url=${ADMIN_URL}`);
            });
        } else {
          alert('로그인 후 이용해주세요');
          window.location.replace(`${AUTH_URL}/admin-login?redirect_url=${ADMIN_URL}`);
        }
      } else return Promise.reject(error);
    }
  },
);
