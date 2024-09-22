import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Toast } from '@entrydsm/design-system';
import { instance } from '../axios';
import {
  IApplicationCountRequest,
  IApplicationDetailResponse,
  IApplicationListRequest,
  IApplicationListResponse,
  IGetScoreStatisticsResponse,
  IGetPdfApplicatnsInfoResponse,
  IApplicationLocationRequest,
} from './types';
import fileSaver from 'file-saver';

const router = 'admin';

/** 지원자 목록 */
export const getApplicationList = ({
  size,
  offset,
  isDaejeon,
  isNationwide,
  isSubmitted,
  isNotSubmitted,
  inOfHeadcount,
  outOfHeadcount,
  isCommon,
  isMeister,
  isSocial,
  receiptCode,
  schoolName,
  name,
}: IApplicationListRequest) => {
  const response = async () => {
    const { data } = await instance.get(
      `${router}/application/applicants?size=${size}&offset=${offset}&isDaejeon=${isDaejeon}&isNationwide=${isNationwide}&isSubmitted=${isSubmitted}&isNotSubmitted=${isNotSubmitted}&inOfHeadcount=${inOfHeadcount}&outOfHeadcount=${outOfHeadcount}&isCommon=${isCommon}&isMeister=${isMeister}&isSocial=${isSocial}&receiptCode=${receiptCode}&schoolName=${schoolName}&name=${name}`,
    );
    return data;
  };
  return useQuery<IApplicationListResponse>(
    [
      'applicationList',
      size,
      offset,
      isDaejeon,
      isNationwide,
      isSubmitted,
      isNotSubmitted,
      inOfHeadcount,
      outOfHeadcount,
      isCommon,
      isMeister,
      isSocial,
      receiptCode,
      schoolName,
      name,
    ],
    response,
  );
};

/** 지원자 세부 정보 */
export const getApplicantDetail = (id: string) => {
  const resposne = async () => {
    const { data } = await instance.get(`${router}/application/${id}`);
    return data;
  };
  return useQuery<IApplicationDetailResponse>(
    ['applicationList', id],
    resposne,
    { enabled: !!id },
  );
};

/** 유형별 인원 변경 */
export const editApplicationCount = () => {
  const response = async (params: IApplicationCountRequest) => {
    const { data } = await instance.post(
      `${router}/application/static/count`,
      params,
    );
    return data;
  };

  return useMutation(response, {
    onError: () => {
      Toast('수정에 실패하였습니다.', { type: 'error' });
    },
  });
};

/** 유형별 인원 가져오기 */
export const getApplicationCount = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/application/statics/count`);
    return data;
  };
  return useQuery<IApplicationCountRequest[]>(['applicationCount'], response);
};

/** 접수 현황 집계(점수) */
export const getStaticsScore = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/application/statics/score`);
    return data;
  };

  return useQuery<IGetScoreStatisticsResponse[]>(['staticsScore'], response);
};

/** 접수 현황 집계(지원자) */
export const getStaticCounts = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/application/statics/count`);
    return data;
  };
  return useQuery<IApplicationCountRequest[]>(['staticCount'], response);
};

/** 접수 현황 집계(지역별) */
export const getStaticLocation = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/application/region-status`);
    return data;
  };
  return useQuery<IApplicationLocationRequest>(['staticLocation'], response);
};

/** 지원자 목록 엑셀 출력 */
export const getApplicationListExcel = () => {
  const response = async () => {
    const { data } = await instance.get(
      `${router}/application/excel/applicants`,
      {
        responseType: 'blob',
      },
    );
    return data;
  };

  const date = new Date();

  return useMutation(response, {
    onSuccess: (res) => {
      fileSaver.saveAs(
        res,
        `지원자목록_${date.getMonth() + 1}월${date.getDate()}일_${date.getHours()}시${date.getMinutes()}분`,
      );
    },
  });
};

/** 원서 도착 상태 여부 변경 */
export const changeArrivedStatus = () => {
  const response = async ({
    receipt_code,
    is_prints_arrived,
  }: {
    receipt_code: number;
    is_prints_arrived: boolean;
  }) => {
    const { data } = await instance.patch(
      `${router}/status/prints-arrived/${receipt_code}?is_prints_arrived=${is_prints_arrived}`,
    );
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation(response, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['applicationList']);
      Toast('원서 도착 상태가 수정되었습니다', { type: 'success' });
    },
    onError: () => {
      Toast('원서 도착 상태 수정에 실패하였습니다', { type: 'error' });
    },
  });
};

/** 수험표 엑셀 출력 */
export const getAdmissionTicket = () => {
  const response = async () => {
    const { data } = await instance.get(
      `${router}/application/excel/admission-ticket`,
      {
        responseType: 'blob',
        timeout: 40000,
      },
    );
    return data;
  };

  const date = new Date();

  return useMutation(response, {
    onSuccess: (res) => {
      fileSaver.saveAs(
        res,
        `수험표_${date.getMonth() + 1}월${date.getDate()}일_${date.getHours()}시${date.getMinutes()}분`,
      );
    },
    onError: () => {
      Toast('전형기간이 끝나지 않았습니다', { type: 'error' });
    },
  });
};

/** 지원자 검증 목록 엑셀 출력 */
export const getApplicantsCheck = () => {
  const response = async () => {
    const { data } = await instance.get(
      `${router}/application/excel/applicants/check-list`,
      {
        responseType: 'blob',
      },
    );
    return data;
  };

  const date = new Date();

  return useMutation(response, {
    onSuccess: (res) => {
      fileSaver.saveAs(
        res,
        `지원자검증목록${date.getMonth() + 1}월${date.getDate()}일_${date.getHours()}시${date.getMinutes()}분`,
      );
    },
  });
};

export const getPdfApplicatnsInfo = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}`);
    return data;
  };
  return useQuery<IGetPdfApplicatnsInfoResponse[]>(['selfStudyText'], response);
};

/** 지원자 코드 목록 엑셀 출력 */
export const getApplicantsCodeExecl = () => {
  const response = async () => {
    const { data } = await instance.get(
      `${router}/application/excel/applicants/code`,
      {
        responseType: 'blob',
      },
    );
    return data;
  };

  const date = new Date();

  return useMutation(response, {
    onSuccess: (res) => {
      fileSaver.saveAs(
        res,
        `지원자코드_${date.getMonth() + 1}월${date.getDate()}일_${date.getHours()}시${date.getMinutes()}분`,
      );
    },
    onError: () =>
      Toast('지원자 코드 목록 엑셀 출력에 실패하였습니다.', { type: 'error' }),
  });
};
