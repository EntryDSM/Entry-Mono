import { useQuery } from '@tanstack/react-query';
import { IGetScheduleResponse } from './type';
import { instance } from '../axios';

const router = 'schedule';

export const getSchedule = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}`);
    return data;
  };

  return useQuery<IGetScheduleResponse>(['schedule'], response);
};
