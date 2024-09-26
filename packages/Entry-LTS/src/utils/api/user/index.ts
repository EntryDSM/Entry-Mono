import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IApplyInfoStatusResponse, IAuthorizationResponse } from './response';
import { Toast } from '@entrydsm/design-system';
import { MAIN_URL } from '@/constant/env';

const router = 'user';

export const ReissueToken = async (refreshToken: string) => {
  const response = await instance.put<IAuthorizationResponse>(
    `${router}/auth`,
    null,
    {
      headers: {
        'X-Refresh-Token': `${refreshToken}`,
      },
    },
  );

  return response.data;
};

export const ApplyInfoStatus = (isLogin?: boolean) => {
  const response = async () => {
    const { data } = await instance.get<IApplyInfoStatusResponse>(
      `${router}/info`,
    );
    return data;
  };
  return useQuery(['applyInfoStatus'], response, {
    enabled: isLogin,
  });
};

export const DeleteUserInfo = () => {
  const response = async () => {
    await instance.delete(`${router}`);
  };
  return useMutation(response, {
    onSuccess: () => {
      Toast('회원탈퇴에 성공하였습니다.', { type: 'success' });
      window.location.replace(`${MAIN_URL}`);
    },
    onError: () => {
      Toast('최종제출시 회원탈퇴는 불가능합니다.', { type: 'error' });
    },
  });
};

export const DeleteUserPdf = (param: number) => {
  const response = async () => {
    await instance.delete(`${router + '/' + param}`);
  };
  return useMutation(response, {
    onSuccess: () =>
      Toast('원서제출 취소에 성공하였습니다.', { type: 'success' }),
  });
};

export const DeleteUser = () => {
  const response = async () => {
    await instance.delete(`${router}`);
  };

  const mutation = useMutation(response, {
    onError: () => {
      Toast('회원탈퇴에 실패하였습니다.', { type: 'error' });
    },
    onSuccess: () => {
      Toast('회원탈퇴가 완료되었습니다.', { type: 'success' });
    },
  });

  return {
    deleteUser: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};
