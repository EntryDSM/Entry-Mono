import { AxiosError, isAxiosError } from 'axios';
import { Toast } from '@entrydsm/design-system';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../axios';
import { useModal } from '@/hooks/useModal';
import {
  IGetUserInfo,
  IGetUSerType,
  IPatchGraduationType,
  IPatchUserInfo,
  IPatchUserIntroduce,
  IPatchUserPhoto,
  IPatchUserPlan,
  IPatchUserType,
  IUserMiddleSchool,
} from './types';
import { IPatchUserMiddleSchool } from '@/interface/type';

const router = 'application';

/** 전형 구분 선택 */
export const EditUserType = () => {
  const response = async (param: IPatchUserType) => {
    return instance.patch(`${router}/type`, param);
  };
  const queryClient = useQueryClient();
  return useMutation(response, {
    onError: (res: AxiosError<AxiosError>) => {
      switch (res?.response?.data.message) {
        case 'Invalid graduate at':
          return Toast('연도를 확인해 주세요.', { type: 'error' });
        default:
          return Toast('전형구분 제출에 실패하였습니다.', { type: 'error' });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userType']);
    },
  });
};

/** 졸업 유형 선택 */
export const PatchGraduationType = () => {
  const response = async (param: IPatchGraduationType) => {
    return instance.patch(`${router}/graduation/type`, param);
  };
  const queryClient = useQueryClient();
  return useMutation(response, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userType']);
    },
  });
};

/** 전형 구분 조회 */
export const GetUserType = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUSerType>(`${router}/type`);
    return data;
  };
  return useQuery(['userType'], response);
};

/** 인적사항 입력 */
export const EditUserInfo = () => {
  const response = async (params: IPatchUserInfo) => {
    return instance.patch(`${router}`, params);
  };
  return useMutation(response, {
    onError: (e) => {
      let message = '인적사항 제출에 실패하였습니다.';
      if (isAxiosError(e)) {
        switch (e.response?.data?.message) {
          case 'Education Status is unmatched':
            message = '자신의 전형상태가 검정고시가 아닌지 확인해보세요.';
            break;
          case 'File Extension is invalid':
            message = '파일은 jpg, jpeg, png만 허용됩니다.';
            break;
          case 'Request fail to tmap server.':
            message = '주소가 잘못되었습니다.';
            break;
          default:
            break;
        }
      }
      Toast(message, { type: 'error' });
    },
  });
};

/** 인적사항 조회 */
export const GetUserInfo = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUserInfo>(`${router}`);
    return data;
  };
  return useQuery(['userInfos'], response);
};

/** 증명사진 입력 */
export const EditUserPhoto = () => {
  const response = async (params: IPatchUserPhoto) => {
    const form = new FormData();
    form.append('image', params.photo);
    return instance.post(`${router}/photo `, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return useMutation(response, {
    onError: (e) => {
      let message = '증명사진 업로드에 실패하였습니다.';
      if (isAxiosError(e) && e.response?.status === 404) {
        message = '증명사진을 입력해주세요.';
      }
      Toast(message, { type: 'error' });
    },
  });
};

/** 유저 이름, 전화번호 조회 */
export const GetUserProfile = () => {
  const response = async () => {
    const { data } = await instance.get<{
      name: string;
      phoneNumber: string;
      isParent: boolean;
    }>(`user/info`);
    return data;
  };
  return useQuery(['userProfile'], response);
};

/** 졸업/졸업예정 추가정보 입력 */
export const EditAdditionalInfo = () => {
  const response = async (params: IPatchUserMiddleSchool) => {
    return instance.patch(`${router}/graduation`, params);
  };
  return useMutation(response, {
    onError: () =>
      Toast('중학교 정보 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 졸업/졸업예정 추가정보 조회 */
export const GetAdditionalInfo = () => {
  const response = async () => {
    const { data } = await instance.get<IUserMiddleSchool>(
      `${router}/graduation`,
    );
    return data;
  };
  return useQuery(['userMiddleSchool'], response);
};

/** 자기소개서 조회 */
export const GetUserIntroduce = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchUserIntroduce>(`${router}/intro`);
    return data;
  };
  return useQuery(['userIntroduce'], response);
};

/** 자기소개서 입력 */
export const EditUserIntroduce = () => {
  const response = async (params: IPatchUserIntroduce) => {
    return instance.patch(`${router}/intro`, params);
  };
  return useMutation(response, {
    onError: () =>
      Toast('자기소개서 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 자기소개서 조회 */
export const GetUserStudyPlan = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchUserPlan>(`${router}/study-plan`);
    return data;
  };
  return useQuery(['userStudyPlan'], response);
};

/** 학업계획서 입력 */
export const EditUserPlan = () => {
  const response = async (params: IPatchUserPlan) => {
    return instance.patch(`${router}/study-plan`, params);
  };
  return useMutation(response, {
    onError: () =>
      Toast('학업계획서 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 최종제출 */
export const SubmitPdf = () => {
  const { setModalState } = useModal();
  const response = async () => {
    return instance.post(`${router}/final-submit`);
  };
  return useMutation(response, {
    onSuccess: () => setModalState('SUCCESS'),
    onError: (e) => {
      let message = '이상한 오류';
      if (isAxiosError(e)) {
        switch (e.response?.data.message) {
          case 'Application process is not completed':
            message = '완료되지 않은 부분이 존재합니다.';
            break;
          case '이미 최종제출이 되어있습니다.':
            message = '이미 제출된 원서입니다.';
            setModalState('ERROR');
            break;
        }
      }
      Toast(message, { type: 'error' });
    },
  });
};
