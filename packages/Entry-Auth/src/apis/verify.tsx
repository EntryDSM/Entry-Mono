import { useQuery } from 'react-query';
import { instance } from './axios';
import { getLocalStorage } from '@/utils/localstorage';
import { useEffect, useState } from 'react';

interface UserVerifyInfo {
  name: string;
  phoneNumber: string;
}

export const useVerifyUserInfo = (mdl_tkn: string | null) => {
  const [isVerified, setIsVerified] = useState<string | null>(null);

  const onFocus = () => {
    setIsVerified(getLocalStorage('isVerified'));
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const getUserData = useQuery(
    ['getUserInfo', mdl_tkn],
    () =>
      instance.get<UserVerifyInfo>(
        `/user/verify/info?mdl_tkn=${mdl_tkn || ''}`,
      ),
    {
      refetchOnWindowFocus: true,
      retry: 0,
      enabled: mdl_tkn !== null && isVerified !== null,
      staleTime: 0,
    },
  );

  return {
    getUserData,
  };
};
