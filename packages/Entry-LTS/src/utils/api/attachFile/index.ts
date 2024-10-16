import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { Toast } from '@entrydsm/design-system';

export const UploadAttachFile = () => {
  const response = async (params: File[]) => {
    console.log(params);
    const form = new FormData();
    params.forEach((param) => form.append('attach_file', param));

    return instance.post(`/attach-file`, form);
  };

  return useMutation(response, {
    onError: () => {
      Toast('파일 업로드에 실패했습니다', { type: 'error' });
    },
  });
};
