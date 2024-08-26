import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IGetDocumentInfo, IGetUserInfo } from './type';
import { useModal } from '@/hooks/useModal';
import { isAxiosError } from 'axios';
import { Toast } from '@entrydsm/design-system';

const router = 'application/final-submit';

export const getUserInfo = (isLogin?: boolean) => {
  const response = async () => {
    const { data } = await instance.get<IGetUserInfo>(`/user/info`);
    return data;
  };
  return useQuery(['userInfo'], response, {
    enabled: isLogin,
  });
};

export const getDocumentInfo = () => {
  const response = async () => {
    const { data } =
      await instance.get<IGetDocumentInfo>(`/application/status`);
    return data;
  };
  return useQuery(['getDocument'], response);
};

/** 최종제출 */
export const SubmitPdf = () => {
  const response = async () => {
    try {
      const result = await instance.post(router);
      if (result.status === 204) {
        return true;
      }
      return false;
    } catch (e) {
      if (isAxiosError(e)) {
        return false;
      }
      return false;
    }
  };

  return useMutation(response);
};
