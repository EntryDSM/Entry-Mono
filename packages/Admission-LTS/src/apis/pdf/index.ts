import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Toast } from '@entrydsm/design-system';
import { instance } from '../axios';

const router = 'pdf';

/** 미리보기용 원서 pdf 출력 */
export const GetPdfPreview = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/preview`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      },
    });
    return data;
  };
  return useQuery(['PdfPreview'], response, {
    onError: (e) => {
      let message = 'PDF를 불러오는데 실패하였습니다.';
      if (isAxiosError(e)) {
        switch (e.response?.data?.message) {
          case 'Score not found':
            message = '성적점수를 입력하였는지 확인해주세요.';
            break;
          case 'Educational status is null':
            message = '전형 상태가 존재하지 않습니다.';
            break;
          case 'Request fail to tmap server.':
            message = '주소가 잘못 입력되었습니다.';
            break;
          case 'Invalid graduate at':
            message = '졸업일이 유효하지 않습니다.';
            break;
          case 'The application could not be found':
            message = '원서를 찾을 수 없습니다.';
            break;
          case 'The school could not be found':
            message = '학교를 찾을 수 없습니다.';
            break;
          case 'Image not found.':
            message = '이미지를 찾을 수 없습니다.';
            break;
        }
      }
      Toast(message, { type: 'error' });
    },
  });
};
