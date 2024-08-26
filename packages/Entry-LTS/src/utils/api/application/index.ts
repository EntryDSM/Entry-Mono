import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IGetDocumentInfo, IGetUserInfo } from './type';
import { useModal } from '@/hooks/useModal';
import { isAxiosError } from 'axios';
import { Toast } from '@entrydsm/design-system';

const router = 'application';

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
    const { data } = await instance.get<IGetDocumentInfo>(`${router}/status`);
    return data;
  };
  return useQuery(['getDocument'], response);
};

export const getApply = () => {
  const response = async () => {
    const { data } = await instance.post(`${router}/status`);
    return data;
  };
  return useMutation(response);
};

export const ApplyStatus = () => {
  const response = async () => {
    try {
      const result = await instance.post(`${router}/status`);
      console.log('ApplyStatus response:', result.status);
      if (result.status === 405) {
        return true;
      }
      return false;
    } catch (e) {
      if (isAxiosError(e)) {
        console.error('Axios error:', e.response?.status);
        if (e.response?.status === 405) {
          return true;
        }
      }
      return false;
    }
  };

  return useMutation(response);
};
