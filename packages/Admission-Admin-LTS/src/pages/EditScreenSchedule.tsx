import { Button, Dropdown, Text, theme } from '@entrydsm/design-system';
import styled from '@emotion/styled';
import ProgressBar from '../components/ProgressBar';
import { generateNumberArray } from '@/utils/GenerateNumberArray';
import { useDropDown } from '@/hooks/useDropDown';
import { editSchedule, getSchedule } from '@/utils/api/schedule';
import { useEffect, useState } from 'react';

const scheduleType = [
  'START_DATE',
  'FIRST_ANNOUNCEMENT',
  'INTERVIEW',
  'SECOND_ANNOUNCEMENT',
  'END_DATE',
];

const screenScheduleProgress = [
  '원서 제출',
  '1차 발표',
  '심층 면접',
  '최종발표',
];

const EditScreenSchedule = () => {
  const { mutate } = editSchedule();
  const { data } = getSchedule();

  const {
    form: startDropDown,
    onChange: onChangeStartDropDown,
    setForm: setStartDropDown,
  } = useDropDown([
    ['01월', '01일', '00시', '00분'],
    ['01월', '01일', '00시', '00분'],
    ['01월', '01일', '00시', '00분'],
    ['01월', '01일', '00시', '00분'],
  ]);

  const {
    form: endDropDown,
    onChange: onChangeEndDropDown,
    setForm: setEndDropDown,
  } = useDropDown([['01월', '01일', '00시', '00분']]);

  const [cancleFlag, setCancleFlag] = useState(false);

  const dropDownOption = (index: number) => {
    switch (index) {
      case 0:
        return generateNumberArray(1, 12, '월');
      case 1:
        return generateNumberArray(1, 31, '일');
      case 2:
        return generateNumberArray(0, 23, '시');
      case 3:
        return generateNumberArray(0, 59, '분');
      default:
        return [];
    }
  };

  useEffect(() => {
    if (data) {
      const startDate = new Date(data?.schedules[0]?.date ?? '');
      const endDate = new Date(data?.schedules[4]?.date ?? '');
      const firstAnnouncementDate = new Date(data?.schedules[1]?.date ?? '');
      const interviewDate = new Date(data?.schedules[2]?.date ?? '');
      const secondAnnouncementDate = new Date(data?.schedules[3]?.date ?? '');

      setStartDropDown(() => [
        [
          `${(startDate.getMonth() + 1).toString().padStart(2, '0')}월`,
          `${startDate.getDate().toString().padStart(2, '0')}일`,
          `${startDate.getHours().toString().padStart(2, '0')}시`,
          `${startDate.getMinutes().toString().padStart(2, '0')}분`,
        ],
        [
          `${(firstAnnouncementDate.getMonth() + 1).toString().padStart(2, '0')}월`,
          `${firstAnnouncementDate.getDate().toString().padStart(2, '0')}일`,
          `${firstAnnouncementDate.getHours().toString().padStart(2, '0')}시`,
          `${firstAnnouncementDate.getMinutes().toString().padStart(2, '0')}분`,
        ],
        [
          `${(interviewDate.getMonth() + 1).toString().padStart(2, '0')}월`,
          `${interviewDate.getDate().toString().padStart(2, '0')}일`,
          `${interviewDate.getHours().toString().padStart(2, '0')}시`,
          `${interviewDate.getMinutes().toString().padStart(2, '0')}분`,
        ],
        [
          `${(secondAnnouncementDate.getMonth() + 1).toString().padStart(2, '0')}월`,
          `${secondAnnouncementDate.getDate().toString().padStart(2, '0')}일`,
          `${secondAnnouncementDate.getHours().toString().padStart(2, '0')}시`,
          `${secondAnnouncementDate.getMinutes().toString().padStart(2, '0')}분`,
        ],
      ]);
      setEndDropDown([
        [
          `${(endDate.getMonth() + 1).toString().padStart(2, '0')}월`,
          `${endDate.getDate().toString().padStart(2, '0')}일`,
          `${endDate.getHours().toString().padStart(2, '0')}시`,
          `${endDate.getMinutes().toString().padStart(2, '0')}분`,
        ],
      ]);
    }
  }, [data, cancleFlag]);

  return (
    <_Wrapper>
      <Text size="header1" color="black900">
        전형 일정 수정
      </Text>
      <Text color="black400" size="title1">
        전형 일정은 다음과 같이 표시됩니다
      </Text>
      <_ProgressWrapper>
        <ProgressBar />
      </_ProgressWrapper>
      <_Table>
        <_THead>
          {screenScheduleProgress.map((progressName) => (
            <Text display="flex" color="black900" size="title1" width={200}>
              {progressName}
            </Text>
          ))}
        </_THead>
        <_TBody>
          <Text width={200} color="black900" size="title1">
            시작
          </Text>
          {startDropDown.map((res, typeIdx) => {
            {
              return (
                <_DropDowns>
                  {res.map((res, dateIdx) => {
                    return (
                      <Dropdown
                        width={80}
                        onChange={(value) => {
                          onChangeStartDropDown([typeIdx, dateIdx], value);
                        }}
                        options={dropDownOption(dateIdx)}
                        value={res}
                      />
                    );
                  })}
                </_DropDowns>
              );
            }
          })}
        </_TBody>
        <_TBody>
          <Text width={200} color="black900" size="title1">
            마감
          </Text>
          {endDropDown.map((res, typeIdx) => {
            {
              return (
                <_DropDowns>
                  {res.map((res, dateIdx) => {
                    return (
                      <Dropdown
                        width={80}
                        onChange={(value) =>
                          onChangeEndDropDown([typeIdx, dateIdx], value)
                        }
                        options={dropDownOption(dateIdx)}
                        value={res}
                      />
                    );
                  })}
                </_DropDowns>
              );
            }
          })}
        </_TBody>
      </_Table>
      <_Buttons>
        <Button
          color="green"
          onClick={() => {
            mutate([
              {
                type: 'START_DATE',
                date: `2024-${startDropDown[0][0].slice(0, 2)}-${startDropDown[0][1].slice(
                  0,
                  2,
                )}T${startDropDown[0][2].slice(0, 2)}:${startDropDown[0][3].slice(0, 2)}:00`,
              },
              {
                type: 'END_DATE',
                date: `2024-${endDropDown[0][0].slice(0, 2)}-${endDropDown[0][1].slice(0, 2)}T${endDropDown[0][2].slice(
                  0,
                  2,
                )}:${endDropDown[0][3].slice(0, 2)}:00`,
              },
              {
                type: 'FIRST_ANNOUNCEMENT',
                date: `2024-${startDropDown[1][0].slice(0, 2)}-${startDropDown[1][1].slice(
                  0,
                  2,
                )}T${startDropDown[1][2].slice(0, 2)}:${startDropDown[1][3].slice(0, 2)}:00`,
              },
              {
                type: 'INTERVIEW',
                date: `2024-${startDropDown[2][0].slice(0, 2)}-${startDropDown[2][1].slice(
                  0,
                  2,
                )}T${startDropDown[2][2].slice(0, 2)}:${startDropDown[2][3].slice(0, 2)}:00`,
              },
              {
                type: 'SECOND_ANNOUNCEMENT',
                date: `2024-${startDropDown[3][0].slice(0, 2)}-${startDropDown[3][1].slice(
                  0,
                  2,
                )}T${startDropDown[3][2].slice(0, 2)}:${startDropDown[3][3].slice(0, 2)}:00`,
              },
            ]);
          }}
        >
          저장
        </Button>
        <Button
          color="green"
          kind="outlined"
          onClick={() => {
            setCancleFlag(!cancleFlag);
          }}
        >
          취소
        </Button>
      </_Buttons>
    </_Wrapper>
  );
};

export default EditScreenSchedule;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 65rem;
  width: 100%;
  margin: 7rem auto 0;
  padding: 0 20px 200px;
  gap: 25px;
`;

const _ProgressWrapper = styled.div`
  padding: 10px;
  border: 1px solid ${theme.color.black200};
  border-radius: 20px;
`;

const _Table = styled.div`
  width: 100%;
`;

const _THead = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${theme.color.black100};
`;

const _TBody = styled.div`
  position: relative;
  width: 100%;
  height: 138px;
  display: flex;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid ${theme.color.black100};
  &:nth-of-type(2) {
    z-index: 99;
  }
`;

const _Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const _DropDowns = styled.div`
  width: 150px;
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(2, 1fr);
  margin-right: 50px;
  > div {
    position: relative;
    &:nth-of-type(1) {
      z-index: 2;
    }
    &:nth-of-type(2) {
      z-index: 2;
    }
    &:nth-of-type(3) {
      z-index: 1;
    }
    &:nth-of-type(4) {
      z-index: 1;
    }
  }
`;
