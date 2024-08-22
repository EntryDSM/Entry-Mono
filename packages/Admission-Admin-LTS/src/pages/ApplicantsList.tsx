import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Checkbox, Input, Stack, Text, theme } from '@entrydsm/design-system';
import {
  changeArrivedStatus,
  getAdmissionTicket,
  getApplicantsCheck,
  getApplicantsCodeExecl,
  getApplicationList,
  getApplicationListExcel,
  getPdfApplicatnsInfo,
} from '@/utils/api/admin';
import { IApplicationListRequest, IGetPdfApplicatnsInfoResponse } from '@/utils/api/admin/types';
import { applicationTypeToKorean } from '@/utils/translate';
import PageNation from '@/components/PageNation';
import { SideBar } from '@/components/SideBar';
import { StudentInfo } from '@/components/StudentInfo';
import ApplicantsInfoPDF from '@/components/ApplicantsInfoPDF/ApplicantsInfoPDF';
import { convert2Pdf } from '@/utils/converToPdf';
import { usePDF } from 'react-to-pdf';
import { PDFDownloadLink, Document, Page, View } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const headText = ['접수번호', '이름', '지역', '전형', '원서 도착 상태', '최종제출'];

const ApplicantsList = () => {
  const [filter, setFilter] = useState<IApplicationListRequest>({
    size: 10,
    offset: 0,
    isDaejeon: false,
    isNationwide: false,
    isSubmitted: false,
    isNotSubmitted: false,
    inOfHeadcount: false,
    outOfHeadcount: false,
    isCommon: false,
    isMeister: false,
    isSocial: false,
    receiptCode: '',
    schoolName: '',
    name: '',
  });
  const [page, setPage] = useState(0);

  const onChangeCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    setFilter((prev) => ({ ...prev, [name]: checked }));
    setPage(0);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');
  const targetRef = useRef<HTMLDivElement>(null);

  const { data: application_list, isLoading } = getApplicationList(filter);
  const { mutate: application_list_excel } = getApplicationListExcel();
  const { mutate: admission_ticket_excel } = getAdmissionTicket();
  const { mutate: change_arrived_status } = changeArrivedStatus();
  const { mutate: applicants_check } = getApplicantsCheck();
  // const { data: pdfApplicatnsInfo } = getPdfApplicatnsInfo();
  const { mutate: applicants_code_execl } = getApplicantsCodeExecl();

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page }));
  }, [page]);

  return (
    <_Wrapper>
      <Text size="header1" color="black900">
        지원자 목록
      </Text>
      <Stack style={{ width: '100%' }} align="center" justify="space-between">
        <Input
          width={300}
          icon="Magnifier"
          type="text"
          placeholder="검색"
          onChange={(e) => {
            setFilter({ ...filter, name: e.target.value }), setPage(0);
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(100px, auto))',
            gap: '20px',
            width: '600px',
          }}
        >
          <Button color="green" onClick={applicants_check}>
            지원자 검증 목록
          </Button>
          <Button color="green" onClick={admission_ticket_excel}>
            수험표
          </Button>
          <Button color="green" onClick={application_list_excel}>
            지원자 목록 Excel
          </Button>
          <Button color="green" onClick={applicants_code_execl}>
            지원자 코드 목록 Excel
          </Button>
          {/* <PDFDownloadLink
            document={<Introduce pdfApplicatnsInfo={pdfApplicatnsInfo} />}
            fileName="자기소개서&학업계획서.pdf"
          >
            <Button
              color="green"
              onClick={() => convert2Pdf(targetRef, 'hi')}
              disabled={!targetRef || !pdfApplicatnsInfo}
            >
              자소서 & 학업계획서 pdf
            </Button>
          </PDFDownloadLink> */}
        </div>
      </Stack>
      <Text color="black900" size="title2" margin={[8, 0, 8, 0]}>
        필터
      </Text>
      <_CheckBoxs>
        <Checkbox
          color="green"
          isChecked={filter.isDaejeon}
          value=""
          label="대전"
          name="isDaejeon"
          onClick={onChangeCheckBox}
        />
        <Checkbox
          color="green"
          isChecked={filter.isNationwide}
          value=""
          label="전국"
          name="isNationwide"
          onClick={onChangeCheckBox}
        />
        <_Line />
        <Checkbox
          color="green"
          isChecked={filter.isSubmitted}
          value=""
          label="최종제출 완료"
          name="isSubmitted"
          onClick={onChangeCheckBox}
        />
        <Checkbox
          color="green"
          isChecked={filter.isNotSubmitted}
          value=""
          label="최종제출 미완료"
          name="isNotSubmitted"
          onClick={onChangeCheckBox}
        />
        <_Line />
        <Checkbox
          color="green"
          isChecked={filter.isCommon}
          value=""
          label="일반전형"
          name="isCommon"
          onClick={onChangeCheckBox}
        />
        <Checkbox
          color="green"
          isChecked={filter.isMeister}
          value=""
          label="마이스터 전형"
          name="isMeister"
          onClick={onChangeCheckBox}
        />
        <Checkbox
          color="green"
          isChecked={filter.isSocial}
          value=""
          label="사회통합 전형"
          name="isSocial"
          onClick={onChangeCheckBox}
        />
      </_CheckBoxs>
      <_THead>
        {headText.map((text) => (
          <Text align="center" width={110} color="black700" size="body1">
            {text}
          </Text>
        ))}
      </_THead>
      {application_list?.applicants.map((applicant, idx) => (
        <_TBody
          isClicked={applicant.receiptCode === +receiptCode}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setReceiptCode(String(applicant.receiptCode));
          }}
        >
          <Text align="center" width={110} color="black800" size="body3">
            {applicant.receiptCode}
          </Text>
          <Text align="center" width={110} color="black800" size="body3">
            {applicant.name}
          </Text>
          <Text align="center" width={110} color="black800" size="body3">
            {applicant.isDaejeon ? '대전' : '전국'}
          </Text>
          <Text align="center" width={110} color="black800" size="body3">
            {applicationTypeToKorean[applicant.applicationType]} 전형
          </Text>
          <Stack width={110} justify="center">
            <Checkbox
              color="green"
              label=""
              name=""
              onClick={(e) => {
                e.stopPropagation();
                change_arrived_status({
                  receipt_code: applicant.receiptCode,
                  is_prints_arrived: !applicant.isPrintsArrived,
                });
              }}
              value=""
              isChecked={applicant.isPrintsArrived}
            />
          </Stack>
          <Text align="center" width={110} color="black800" size="body3">
            {applicant.isSubmitted ? '완료' : '미완료'}
          </Text>
        </_TBody>
      ))}
      <SideBar
        title="접수 상세정보"
        isOpened={isOpen}
        close={() => {
          setIsOpen(false);
          setReceiptCode('');
        }}
      >
        <StudentInfo receiptCode={receiptCode} />
      </SideBar>
      {!isLoading && <PageNation pageNum={application_list?.total_pages || 0} current={page} setCurrent={setPage} />}
      {/* <Introduce pdfApplicatnsInfo={pdfApplicatnsInfo}></Introduce> */}

      {/* {pdfApplicatnsInfo && pdfApplicatnsInfo.map((item) => <ApplicantsInfoPDF {...item}></ApplicantsInfoPDF>)} */}
    </_Wrapper>
  );
};

export default ApplicantsList;

const styles = {
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
};

const Introduce = ({ pdfApplicatnsInfo }: { pdfApplicatnsInfo?: IGetPdfApplicatnsInfoResponse[] }) => {
  return (
    <Document>
      {pdfApplicatnsInfo &&
        pdfApplicatnsInfo.map((item) => (
          <Page size="A4">
            <ApplicantsInfoPDF {...item} />
          </Page>
        ))}
    </Document>
  );
};

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 65rem;
  width: 100%;
  margin: 7rem auto 0;
  padding: 0 20px 200px 20px;
`;

const _CheckBoxs = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const _Line = styled.div`
  width: 1px;
  height: 22px;
  background-color: ${theme.color.black300};
`;

const _THead = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  border-top: 1px solid ${theme.color.black900};
  border-bottom: 1px solid ${theme.color.black900};
  padding: 14px 20px;
  margin-top: 20px;
`;

const _TBody = styled.div<{ isClicked: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 10px;
  width: 100%;
  background-color: ${({ isClicked }) => (isClicked ? '#EFEFEF' : 'white')};
  border-bottom: 1px solid ${theme.color.black100};
  padding: 20.5px 20px;
  &:hover {
    background-color: ${({ isClicked }) => (isClicked ? '#EFEFEF' : theme.color.green100)};
  }
`;
