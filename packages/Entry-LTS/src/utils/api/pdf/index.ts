import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import FileSaver from 'file-saver';
import { Toast } from '@entrydsm/design-system';

const router = 'pdf';

/** 미리보기용 원서 pdf 출력 */
export const GetPdfPreview = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/preview`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      },
    });
    return data;
  };
  return useQuery(['PdfPreview'], response);
};

export const DownloadPdf = () => {
  const mutation = useMutation(
    async () => {
      const { data } = await instance.get(`${router}/preview`, {
        responseType: 'blob',
        timeout: 0,
      });
      FileSaver.saveAs(data, `입학원서 미리보기.pdf`);
    },
    {
      onError: () => {
        Toast('입학원서 pdf 다운로드를 실패하였습니다.', { type: 'error' });
      },
    },
  );

  const onDownloadPdf = () => {
    mutation.mutate();
  };

  return {
    onDownloadPdf,
    isLoading: mutation.isLoading,
  };
};
