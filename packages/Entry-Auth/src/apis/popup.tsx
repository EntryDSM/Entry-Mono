import { useMutation } from 'react-query';
import { instance } from './axios';
import { useToken } from '@/hooks/useToken';

export const useOpenPopUp = () => {
  const { setToken, clearToken } = useToken();

  const openPopUp = useMutation(
    (redirectUrl: string) =>
      // eslint-disable-next-line
      instance.post<string>('/user/verify/popup', {
        redirectUrl,
      }),
    {
      onSuccess: (res) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.data, 'text/html');

        const inputEl: HTMLInputElement | null = doc.querySelector(
          'input[name="mdl_tkn"]',
        );
        if (!inputEl) return;
        const mdl_tknValue = inputEl.value;

        setToken(mdl_tknValue);

        const width = 500;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(
          `/pass?mdl_tkn=${mdl_tknValue}`,
          'popup',
          `resizable=no,width=${width},height=${height},left=${left},top=${top}}`,
        );
      },
    },
  );

  return {
    openPopUp,
  };
};
