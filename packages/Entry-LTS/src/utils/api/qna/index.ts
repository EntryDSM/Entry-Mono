import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { ICreateQna } from './request';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { IGetMyQnaList, IQnaDetailResponse, IQnaListResponse } from './response';
import { Toast } from '@entrydsm/design-system';

const router = 'question';

// 질문 전체조회
export const GetAllQna = () => {
  const response = async () => {
    const { data } = await instance.get<IQnaListResponse>(`${router}/all`);
    return data;
  };
  return useQuery(['qna'], response);
};

// 질문 상세조회
export const GetQnaDetail = (qnaId: string) => {
  const response = async () => {
    const { data } = await instance.get<IQnaDetailResponse>(`${router}/${qnaId}`);
    return data;
  };

  const navigate = useNavigate();

  return useQuery(['qna', qnaId], response, {
    onSuccess: () => {},
    onError: (err: AxiosError<AxiosError>) => {
      console.log(err);
      if (err.response?.data.status === 403) {
        Toast('비공개 글 입니다', { type: 'error' });
        navigate('/customer');
      } else if (err.response.data.message === 'The account does not exist') {
        Toast('권한이 없습니다', { type: 'error' });
        navigate('/customer');
      }
    },
  });
};

// 내 질문 목록 조회
export const GetMyQna = () => {
  const response = async () => {
    const { data } = await instance.get<IGetMyQnaList>(`${router}`);
    return data;
  };
  return useQuery(['myQna'], response, {
    onSuccess: () => console.log('success'),
    onError: () => console.log('error'),
  });
};

// 질문 생성
export const CreateQna = (body: ICreateQna) => {
  const navigate = useNavigate();
  const response = async () => {
    return await instance.post(`${router}`, body);
  };

  return useMutation(response, {
    onSuccess: () => {
      Toast('성공', { type: 'success' });
      navigate('/customer');
    },
    onError: (error: AxiosError<AxiosError>) => {
      switch (error.response.data.status) {
        case 400:
          Toast('내용을 입력해주세요', { type: 'error' });
          break;
        case 404:
          Toast('로그인 오류 다시 로그인 해주세요', { type: 'error' });
          navigate('/customer');
          break;
        default:
          return;
      }
    },
  });
};

// 질문 수정
export const EditQna = (qnaId: string) => {
  const response = async () => {
    return instance.patch(`${router}/${qnaId}`);
  };
  return useMutation(response, {
    onSuccess: () => console.log('success'),
  });
};

// 질문 삭제
export const DeleteQna = (qnaId: string) => {
  const response = async () => {
    return instance.delete(`${router}/${qnaId}`);
  };
  return useMutation(response, {
    onSuccess: () => console.log('success'),
  });
};

//
export const GetReplyDetail = (qnaId: string) => {
  const response = async () => {
    return instance.get(`${router}/${qnaId}`);
  };
  return useMutation(response, {
    onSuccess: () => console.log('success'),
  });
};
