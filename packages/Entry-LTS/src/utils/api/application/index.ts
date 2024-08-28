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
