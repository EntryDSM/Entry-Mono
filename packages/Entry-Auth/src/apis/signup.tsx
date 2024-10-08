import { useMutation } from 'react-query';
import { instance } from './axios';
import { useModal } from '@/hooks/useModal';
import { Button, Toast } from '@team-entry/design_system';
import { setCookies, setTokens } from '@/utils/cookies';
import { AuthResponse } from './login';
import { SuccessIcon } from '@/assets/success';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { COOKIE_DOMAIN } from '@/constant/env';

export const useSignUp = (redirectURL: string) => {
  const { render } = useModal();
  const navigate = useNavigate();

  const signUp = useMutation(
    (body: { phoneNumber: string; password: string; isParent: boolean }) =>
      instance.post<AuthResponse>('/user', body),
    {
      onError: (res: AxiosError<AxiosError>) => {
        switch (res.response?.data.message) {
          case 'password는 소문자, 숫자, 특수문자가 포함되어야 합니다.':
            Toast('비밀번호는 소문자, 숫자, 특수문자가 포함되어야 합니다.', {
              type: 'error',
            });
            break;

          case 'User Already Exists':
            Toast('이미 가입된 계정입니다.', {
              type: 'error',
            });
            navigate('/login');
            break;
          default:
            Toast('회원가입에 실패하였습니다.', { type: 'error' });
            break;
        }
      },
      onSuccess: (res) => {
        setTokens(res.data.accessToken, res.data.refreshToken);
        setCookies('authority', 'user', {
          path: '/',
          secure: true,
          sameSite: 'none',
          domain: COOKIE_DOMAIN,
        });
        render({
          title: '회원가입',
          icon: <SuccessIcon />,
          content: '가입이 완료되었습니다',
          button: (
            <Button
              kind="contained"
              color="orange"
              onClick={() => {
                window.location.href = redirectURL;
              }}
            >
              완료
            </Button>
          ),
        });
      },
    },
  );

  return {
    signUp,
  };
};
