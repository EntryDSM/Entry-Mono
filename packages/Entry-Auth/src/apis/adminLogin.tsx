import { useMutation } from 'react-query';
import { instance } from './axios';
import { setCookies, setTokens } from '@/utils/cookies';
import { AuthResponse } from './login';
import { ADMIN_URL, COOKIE_DOMAIN, MAIN_URL } from '@/constant/env';
import { AxiosError } from 'axios';
import { Toast } from '@team-entry/design_system';
import { checkLocalPort } from '@/utils/checkLocalPort';

interface AdminLoginProps {
  adminId: string;
  password: string;
}

export const useAdminLogin = () => {
  return useMutation(
    ({ adminId, password }: AdminLoginProps) =>
      instance.post<AuthResponse>('/admin/auth', {
        adminId,
        password,
      }),
    {
      onError: (res: AxiosError<AxiosError>) => {
        switch (res.response?.data.message) {
          case '크기가 8에서 8 사이여야 합니다':
            Toast('아이디를 다시 확인해주세요.', {
              type: 'error',
            });
            break;
          case 'The account does not exist':
            Toast('아이디 혹은 비밀번호가 일치하자 않습니다.', {
              type: 'error',
            });
            break;
          default:
            Toast('로그인에 실패하였습니다.', { type: 'error' });
        }
      },
      onSuccess: async (res) => {
        let redirectUrl: string;
        if (COOKIE_DOMAIN === 'localhost') {
          const isLocalPortOpen = await checkLocalPort(3001);
          redirectUrl = isLocalPortOpen ? ADMIN_URL : MAIN_URL;
        } else {
          redirectUrl = ADMIN_URL;
        }
        window.location.href = redirectUrl;
        setTokens(res.data.accessToken, res.data.refreshToken);
        setCookies('authority', 'admin', {
          path: '/',
          secure: true,
          sameSite: 'none',
          domain: COOKIE_DOMAIN,
        });
      },
    },
  );
};
