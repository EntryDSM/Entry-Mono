import { instance } from '../axios';

export const ReissueToken = async (refreshToken: string) => {
  const response = await instance.put('/user/auth', null, {
    headers: {
      'X-Refresh-Token': `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};
