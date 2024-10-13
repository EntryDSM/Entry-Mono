import { getSchedule } from '@/utils/api/schedule';
import { scheduleCalculater } from '@/utils/scheduleCalculater';
import { timeformatter } from '@/utils/timeFormatter';
import styled from '@emotion/styled';
import { theme } from '@entrydsm/design-system';
import React, { useEffect, useState } from 'react';
import MobileSchedule from './MobileSchedule';

type ScheduleType = {
  scheduleName: string;
  scheduleTime: string;
};

const Schedule = () => {
  const [schedules, setSchedulesData] = useState<ScheduleType[]>();
  const { data } = getSchedule();

  useEffect(() => {
    if (data?.schedules) {
      const formatData = {
        scheduleName: scheduleCalculater(data?.schedules[0].type),
        scheduleTime: timeformatter(
          data.schedules[0].date,
          data.schedules[4].date,
        ),
      };
      const formatDatas = data?.schedules
        ?.filter((_, i) => i !== 4 && i !== 0)
        .map((schedule) => {
          return {
            scheduleName: scheduleCalculater(schedule.type),
            scheduleTime: timeformatter(schedule.date),
          };
        });
      setSchedulesData([formatData, ...formatDatas]);
    }
  }, [data]);

  return (
    <_Wrapper>
      <_ProgressProvider>
        {schedules?.map((schedule, index) => {
          return (
            <React.Fragment key={index}>
              <_ScheduleCircle>
                <_TextProvider>
                  <div key={index}>
                    {schedule.scheduleName}
                    <span>{schedule.scheduleTime.split(' ')[0]}</span>
                  </div>
                </_TextProvider>
              </_ScheduleCircle>
              {index !== schedules.length - 1 && <_ScheduleLine />}
            </React.Fragment>
          );
        })}
      </_ProgressProvider>
      {/* <_TextProvider>
        {schedules?.map((schedule, index) => {
          return (
            
          );
        })}
      </_TextProvider> */}
      <MobileSchedule />
    </_Wrapper>
        {/*<_Wrap>
      <_Wrapper>
        <_ProgressProvider>
          {schedules?.map((schedule, index) => {
            return (
              <React.Fragment key={index}>
                <_ScheduleCircle>
                  <_ScheduleTitle>
                    {schedule.scheduleName}
                    <_ScheduleDate>{schedule.scheduleTime}</_ScheduleDate>
                  </_ScheduleTitle>
                </_ScheduleCircle>
                {index !== schedules.length - 1 && <_ScheduleLine />}
              </React.Fragment>
            );
          })}
        </_ProgressProvider>
        <MobileSchedule />
      </_Wrapper>
    </_Wrap>*/}
  );
};

export default Schedule;

const _Wrap = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  justify-content: flex-start;
  padding: 0 24px;
`;

const _Wrapper = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const _ProgressProvider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  @media (max-width: 699px) {
    display: none;
  }
`;

const _TextProvider = styled.div`
  display: flex;
  justify-content: center;
  top: 60px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 13.3vw;
  div {
    flex: none;
    width: 104px;
    color: white;
    text-align: center;
    word-wrap: nowrap;
    font-size: 28px;
    font-weight: 500;
    span {
      font-size: 18px;
      font-weight: 500;
      color: ${theme.color.black300};
    }
  }
  @media (max-width: 699px) {
    display: none;
  }
`;

const _ScheduleCircle = styled.div`
  position: relative;
  min-width: 20px;
  min-height: 20px;
  background-color: ${theme.color.orange800};
  border-radius: 50%;
  position: relative;
`;

const _ScheduleLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.orange800};
`;

const _ScheduleTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 180%;
  white-space: nowrap;
  color: white;
  text-align: center;
  word-wrap: nowrap;
  font-size: 28px;
  font-weight: 500;
`;

const _ScheduleDate = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.color.black300};
`;
