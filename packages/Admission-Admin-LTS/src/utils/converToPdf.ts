import { MutableRefObject } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

export const convert2Pdf = async ({ current }: MutableRefObject<HTMLElement | null>, fileName: string) => {
  if (!current) return;
  const promise = async () => {
    const canvas = await html2canvas(current, {
      scale: 3,
      backgroundColor: '#f6f6f6',
    });
    const imgData = canvas.toDataURL('image/png');

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const doc = new jsPDF('p', 'mm', 'a4', true);
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }
    doc.save(fileName + '.pdf');
  };
  toast.promise(
    promise,
    {
      pending: 'PDF로 변환하는 중입니다...',
      success: 'PDF로 변환이 완료되었습니다.',
      error: 'PDF로 변환에 실패하였습니다.',
    },
    {
      autoClose: 1000,
    },
  );
};
