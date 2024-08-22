/** 전형 일정 수정 */

import { Toast } from '@entrydsm/design-system';
import { Axios, AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../axios';
import { IEditScheduleRequest, IGetScheduleResponse } from './type';

const router = 'schedule';

export const editSchedule = () => {
  const response = async (params: IEditScheduleRequest[]) => {
    const { data } = await instance.patch(`${router}`, { schedules: params });
    return data;
  };
  const queryClient = useQueryClient();
  return useMutation(response, {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
      Toast('전형 일정이 수정되었습니다.', { type: 'success' });
    },
    onError: (res: AxiosError<AxiosError>) => {
      switch (res.response?.data.message) {
        case 'Schedule sequence is not valid':
          Toast('전형 일정을 다시 확인해주세요.', { type: 'error' });
          break;
        default:
          Toast('전형 일정이 수정에 실패하였습니다.', { type: 'error' });
          break;
      }
    },
  });
};

export const getSchedule = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}`);
    return data;
  };

  return useQuery<IGetScheduleResponse>(['schedule'], response);
};
