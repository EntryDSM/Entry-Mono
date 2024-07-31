import { Toast } from '@entrydsm/design-system';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../axios';
import {
  IGetUserBlackExam,
  IPatchGraduation,
  IPatchUserBlackExam,
} from './type';

const router = 'score';

/** 검정고시 입력 */
export const EditUserBlackExam = () => {
  const response = async (params: IPatchUserBlackExam) => {
    return instance.patch(`${router}/qualification`, params);
  };
  const queryClient = useQueryClient();
  return useMutation(response, {
    onError: () => Toast('검정고시 점수를 확인해주세요', { type: 'error' }),
    onSuccess: () => queryClient.invalidateQueries(['PdfPreview']),
  });
};

/** 검정고시 조회 */
export const GetUserBlackExam = (isBlackExam: boolean) => {
  const response = async () => {
    const { data } = await instance.get<IGetUserBlackExam>(
      `${router}/qualification`,
    );
    return data;
  };
  return useQuery(['userBlackExam'], response, {
    enabled: isBlackExam,
  });
};

/** 미졸업자/졸업자 정보입력 */
export const EditUserGraduation = () => {
  const response = async (params: IPatchGraduation) => {
    return instance.patch(`${router}/graduation`, params);
  };
  return useMutation(response, {
    onError: () => Toast('성적산출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 미졸업자/졸업자 정보입력 */
export const GetUserGraduation = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchGraduation>(
      `${router}/graduation`,
    );
    return data;
  };
  return useQuery(['userGraduation'], response);
};
