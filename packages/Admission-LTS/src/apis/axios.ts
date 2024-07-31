import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { ReissueToken } from './user';
import { APPLY_URL, AUTH_URL, COOKIE_DOMAIN } from '@/constant/env';

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
      const authority = cookie.get('authority');
      if (
        error.response.data.message === 'Invalid Token' ||
        error.response.data.message === 'Expired Token' ||
        error.response.data.message === 'User Not Found' ||
        error.response.data.message === '잘못된 토큰이 유효하지 않습니다'
      ) {
        const originalRequest = config;
        if (refreshToken) {
          ReissueToken(refreshToken)
            .then((res) => {
              cookie.set('accessToken', res?.accessToken, {
                path: '/',
                secure: true,
                sameSite: 'none',
                domain: COOKIE_DOMAIN,
              });
              cookie.set('refreshToken', res?.refreshToken, {
                path: '/',
                secure: true,
                sameSite: 'none',
                domain: COOKIE_DOMAIN,
              });
              cookie.set('authority', authority == 'admin' ? 'admin' : 'user', { path: '/' });
              if (originalRequest) {
                if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${res?.accessToken}`;
                return axios(originalRequest);
              }
            })
            .catch((res: AxiosError<AxiosError>) => {
              if (
                res?.response?.data.status === 404 ||
                res.response?.data.status === 403 ||
                res?.response?.data.message === 'Expired Token' ||
                res.response?.data.message === 'Invalid Token'
              ) {
                cookie.remove('accessToken');
                cookie.remove('refreshToken');
                cookie.remove('authority');
                window.location.replace(`${AUTH_URL}/login?redirect_url=${APPLY_URL}`);
              }
            });
        } else {
          window.location.replace(`${AUTH_URL}/login?redirect_url=${APPLY_URL}`);
        }
      } else return Promise.reject(error);
    }
  },
);
