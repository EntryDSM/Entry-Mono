import { getSchedule } from '@/utils/api/schedule';
import { scheduleCalculater } from '@/utils/scheduleCalculater';
import { timeformatter } from '@/utils/timeFormatter';
import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import React, { useEffect, useState } from 'react';

type ScheduleType = {
  scheduleName: string;
  scheduleTime: string;
};

const MobileSchedule = () => {
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
      <_ProgressBox>
        {schedules?.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <_Circle />
              {index !== schedules.length - 1 && <_Line />}
            </React.Fragment>
          );
        })}
      </_ProgressBox>
      <_ScheduleBox>
        {schedules?.map(({ scheduleName, scheduleTime }, index) => {
          return (
            <_Schedule>
              <Text color="realWhite" size="title1">
                {scheduleName}
              </Text>
              <Text color="black300" size="body1">
                {scheduleTime}
              </Text>
            </_Schedule>
          );
        })}
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

const _Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${theme.color.orange800};
`;

const _Line = styled.div`
  border: 1px solid ${theme.color.orange800};
  /* height: 100%; */
  height: 15.625vw;
`;

const _ScheduleBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const _Schedule = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  gap: 36px;
`;
