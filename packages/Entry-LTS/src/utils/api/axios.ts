import axios, { AxiosError } from 'axios';
import { ReissueToken } from './user';
import {
  getCookies,
  removeCookies,
  removeTokens,
  setCookies,
  setTokens,
} from '@/utils/cookies';
import { AUTH_URL, SERVER_URL } from '@/constant/env';
import { useNavigate } from 'react-router-dom';
import { Toast } from '@entrydsm/design-system';
import process from 'process';

export const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookies('accessToken');
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
      const refreshToken = getCookies('refreshToken');
      const authority = getCookies('authority');

      if (
        error.response.data?.status === 401 ||
        error.response.data?.status === 403
      ) {
        const originalRequest = config;

        if (refreshToken) {
          ReissueToken(refreshToken as string)
            .then((res) => {
              setTokens(res.accessToken, res.refreshToken);
              setCookies('authority', authority === 'admin' ? 'admin' : 'user');
              if (originalRequest?.headers)
                originalRequest.headers['Authorization'] =
                  `Bearer ${res.accessToken}`;
              return axios(originalRequest);
            })
            .catch((res: AxiosError<AxiosError>) => {
              if (+res?.response?.data.code >= 500) {
                return Toast('서버 에러 잠시 뒤 시도해 주세요', {
                  type: 'error',
                });
              }
              removeTokens();
              removeCookies('authority');
              if (res?.response?.data.message !== 'Expired Token') {
                window.location.href = import.meta.env.VITE_AUTH_URL;
              }
            });
        } else {
          removeTokens();
          window.location.href = import.meta.env.VITE_AUTH_URL;
        }
      } else return Promise.reject(error);
    }
  },
);
