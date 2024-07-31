import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { IAuthorizationResponse } from './types';

export const ReissueToken = async (refresh_token: string) => {
  const response = await instance.put<IAuthorizationResponse>(`user/auth`, null, {
    headers: {
      'X-Refresh-Token': `${refresh_token}`,
    },
  });

  return response?.data;
};

/** 원서 생성 */
export const PostUserEntry = () => {
  const response = async () => {
    return instance.post('application');
  };
  return useMutation(response);
};
