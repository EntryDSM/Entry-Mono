import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IGetDocumentInfo, IGetUserInfo } from './type';

// const router = 'application';

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
