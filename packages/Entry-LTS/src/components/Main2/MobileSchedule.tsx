import { getSchedule } from '@/utils/api/schedule';
import { scheduleCalculater } from '@/utils/scheduleCalculater';
import { timeformatter } from '@/utils/timeFormatter';
import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import React, { useEffect, useState } from 'react';

type ScheduleType = {
  scheduleName: string;
  scheduleTime: string;
  startDate: Date;
  endDate: Date;
};

const MobileSchedule = () => {
  const [schedules, setSchedulesData] = useState<ScheduleType[]>();
  const today = new Date();
  const { data } = getSchedule();

  const getNextScheduleIndex = () => {
    if (!schedules) return -1;
    return schedules.findIndex(({ startDate }) => startDate > today);
  };

  useEffect(() => {
    if (data?.schedules) {
      const formatData = {
        scheduleName: scheduleCalculater(data?.schedules[0].type),
        scheduleTime: timeformatter(
          data.schedules[0].date,
          data.schedules[4].date,
        ),
        startDate: new Date(data.schedules[0].date),
        endDate: new Date(data.schedules[4].date),
      };
      const formatDatas = data?.schedules
        ?.filter((_, i) => i !== 4 && i !== 0)
        .map((schedule) => {
          return {
            scheduleName: scheduleCalculater(schedule.type),
            scheduleTime: timeformatter(schedule.date),
            startDate: new Date(schedule.date),
            endDate: new Date(schedule.date),
          };
        });
      setSchedulesData([formatData, ...formatDatas]);
    }
  }, [data]);

  const isTodayInSchedule = (startDate: Date, endDate: Date) => {
    return today >= startDate && today <= endDate;
  };

  return (
    <_Wrapper>
      <_ProgressBox>
        {schedules?.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <_CirclePingAnimation opacity={getNextScheduleIndex() >= index}>
                <_Circle ping={getNextScheduleIndex() === index} />
              </_CirclePingAnimation>

              {index !== schedules.length - 1 && (
                <_Line opacity={getNextScheduleIndex() >= index} />
              )}
            </React.Fragment>
          );
        })}
      </_ProgressBox>
      <_ScheduleBox>
        {schedules?.map(
          ({ scheduleName, scheduleTime, startDate, endDate }, index) => {
            const isActive = isTodayInSchedule(startDate, endDate);
            const nextScheduleIndex = getNextScheduleIndex();
            return (
              <_Schedule
                key={index}
                opacity={isActive || nextScheduleIndex === index}
              >
                <Text color="realWhite" size="title1">
                  {scheduleName}
                </Text>
                <Text color="black300" size="body1">
                  {scheduleTime}
                </Text>
              </_Schedule>
            );
          },
        )}
      </_ScheduleBox>
    </_Wrapper>
  );
};

export default MobileSchedule;

const _Wrapper = styled.div`
  width: 100%;
  display: none;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 699px) {
    display: flex;
  }
  min-height: 260px;
  height: 100%;
`;

const _ProgressBox = styled.div`
  display: flex;
  padding: 4px 0;
  height: 100%;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const _Circle = styled.div<{ ping: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${theme.color.orange800};
  ${({ ping }) =>
    ping &&
    `
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  `}

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const _CirclePingAnimation = styled.div<{ opacity: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${theme.color.orange800};
  opacity: ${({ opacity }) => (opacity ? '100%' : '60%')};
`;

const _Line = styled.div<{ opacity: boolean }>`
  border: 1px solid ${theme.color.orange800};
  height: 15.625vw;
  opacity: ${({ opacity }) => (opacity ? '100%' : '60%')};
`;

const _ScheduleBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const _Schedule = styled.div<{ opacity: boolean }>`
  width: 100%;
  align-items: center;
  display: flex;
  gap: 36px;
  opacity: ${({ opacity }) => (opacity ? '100%' : '60%')};
`;
