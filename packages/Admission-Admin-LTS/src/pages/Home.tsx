import styled from '@emotion/styled';
import {
  Icon,
  IconProps,
  Stack,
  Text,
  VStack,
  theme,
} from '@entrydsm/design-system';
import ProgressBar from '../components/ProgressBar';
import {
  getApplicationCount,
  getStaticCounts,
  getStaticsScore,
} from '@/utils/api/admin';
import { SpecialScoreCard } from '@/components/SpecialScoreCard';
import { CommonScoreCard } from '@/components/CommonScoreCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface IShotcutType {
  id: number;
  link: string;
  icon: IconProps;
  title: string;
}

const Home = () => {
  const { data: staticsScoreData } = getStaticsScore();
  const { data: staticCountsData, refetch } = getStaticCounts();

  const everyCommon = staticCountsData?.[0].count ?? 0;
  const daejeonCommon = staticCountsData?.[1].count ?? 0;
  const everyMeister = staticCountsData?.[2].count ?? 0;
  const daejeonMeister = staticCountsData?.[3].count ?? 0;
  const everySocial = staticCountsData?.[4].count ?? 0;
  const daejeonSocial = staticCountsData?.[5].count ?? 0;
  const allReception =
    everyCommon +
    everyMeister +
    everySocial +
    daejeonCommon +
    daejeonMeister +
    daejeonSocial;

  console.log(allReception, ((allReception ?? 0) / 160) * 100);

  const allCommon = 160;
  const allMeister = 12;
  const allSocial = 2;

  const commonPercent = +((everyCommon + daejeonCommon) / allCommon).toFixed(2);
  const meisterPercent = +(
    (everyMeister + daejeonMeister) /
    allMeister
  ).toFixed(2);
  const socialPercent = +((everySocial + daejeonSocial) / allSocial).toFixed(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <_Wrapper>
      <Stack margin={[0, 'auto']}>
        <VStack margin={['top', 30]}>
          <Text size="header1" color="black900">
            지금은 원서제출 기간입니다.
          </Text>
          <Text size="title2" color="black600">
            원서 제출 : 10월 16일 ~ 10월 19일
          </Text>
        </VStack>
        <ProgressBar />
      </Stack>

      {/* <_GraphWrapper>
        <Text width={80} align="start" size="body1" color="black900">
          일반
        </Text>
        <_Application percent={commonPercent * 100}>
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${everyCommon + daejeonCommon}명 (총 ${allCommon}명)`}
          </_ApplicationText>
        </_Application>
        <Text width={80} align="start" size="body1" color="black900">
          {commonPercent} : 1
        </Text>
      </_GraphWrapper>

      <_GraphWrapper>
        <Text width={80} align="start" size="body1" color="black900">
          마이스터
        </Text>
        <_Application percent={meisterPercent * 100}>
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${everyMeister + daejeonMeister}명 (총 ${allMeister}명)`}
          </_ApplicationText>
        </_Application>
        <Text width={80} align="start" size="body1" color="black900">
          {meisterPercent} : 1
        </Text>
      </_GraphWrapper>

      <_GraphWrapper>
        <Text width={80} align="start" size="body1" color="black900">
          사회통합
        </Text>
        <_Application percent={socialPercent * 100}>
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${everySocial + daejeonSocial}명 (총 ${allSocial}명)`}
          </_ApplicationText>
        </_Application>
        <Text width={80} align="start" size="body1" color="black900">
          {socialPercent} : 1
        </Text>
      </_GraphWrapper> */}

      {/* <_GraphWrapper>
        <Text width={80} align="start" size="body1" color="black900">
          총
        </Text>
        <_Application
          percent={(allReception / (allCommon + allMeister + allSocial)) * 100}
        >
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${allReception}명 (총 ${allCommon + allMeister + allSocial}명)`}
          </_ApplicationText>
        </_Application>
        <Text width={80} align="start" size="body1" color="black900">
          {(allReception / (allCommon + allMeister + allSocial)).toFixed(2)} : 1
        </Text>
      </_GraphWrapper> */}

      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '36px',
          }}
        >
          <Text color="black900" size="header2">
            신입생 지원률
          </Text>
          <Text color="black900" size="title2">
            {allReception}명 / 총 {allCommon}명
          </Text>
        </div>
        <_Application percent={((allReception ?? 0) / 160) * 100}>
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${allReception}명`}
          </_ApplicationText>
        </_Application>
      </div>

      <div
        style={{
          display: 'flex',
          margin: '20px 0',
          gap: '20px',
          width: '100%',
        }}
      >
        <_Shortcut>
          <Link to="/screenSchedule">
            <_ShorcutButton>
              <Icon icon="Culculator" color="green500" />
              <Text color="black800" size="title2">
                전형 일정 수정
              </Text>
            </_ShorcutButton>
          </Link>

          <Link to="/receptionStatus">
            <_ShorcutButton>
              <Icon icon="NavigationArrow" color="green500" />
              <Text color="black800" size="title2">
                접수 현황
              </Text>
            </_ShorcutButton>
          </Link>
          {/* 
          <Link to="/limit">
            <_ShorcutButton>
              <Icon icon="Book" color="green500" />
              <Text color="black800" size="title2">
                정원 수정
              </Text>
            </_ShorcutButton>
          </Link> */}

          <Link to="/applicantsList">
            <_ShorcutButton>
              <Icon icon="ApproveUser" color="green500" />
              <Text color="black800" size="title2">
                지원자 목록
              </Text>
            </_ShorcutButton>
          </Link>
        </_Shortcut>
      </div>

      <Text color="black900" size="header2">
        전형 및 지역별 점수 현황
      </Text>
      <div style={{ display: 'flex', gap: 20, width: '100%' }}>
        <CommonScoreCard
          title="일반 전형"
          ranges={[
            '156~173 ',
            '142~155',
            '128~141',
            '114~127',
            '100~113',
            '86~99',
            '72~85',
            '71점 이하',
          ]}
          daejeonData={staticsScoreData?.[0]}
          nationWideData={staticsScoreData?.[1]}
        />
        <SpecialScoreCard
          title="마이스터 전형"
          ranges={[
            '102~119',
            '94-101',
            '86-93',
            '78-85',
            '70-77',
            '62-69',
            '54-61',
            '53점 이하',
          ]}
          daejeonData={staticsScoreData?.[2]}
          nationWideData={staticsScoreData?.[3]}
        />
        <SpecialScoreCard
          title="사회통합 전형"
          ranges={[
            '102~119',
            '94-101',
            '86-93',
            '78-85',
            '70-77',
            '62-69',
            '54-61',
            '53점 이하',
          ]}
          daejeonData={staticsScoreData?.[4]}
          nationWideData={staticsScoreData?.[5]}
        />
      </div>
    </_Wrapper>
  );
};

export default Home;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 75rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 7rem;
  margin-bottom: 7rem;
  gap: 25px;
`;

const _GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const _Application = styled.div<{ percent: number }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: ${theme.color.green100};
  border-radius: 8px;
  overflow: hidden;
  ::before {
    content: '';
    position: absolute;
    left: 0;
    width: ${({ percent }) => percent}%;
    height: 45px;
    background-color: ${theme.color.green500};
    border-radius: 8px;
  }
`;

const _ApplicationText = styled(Text)`
  z-index: 10;
`;

const _Shortcut = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 auto;
  @media screen and (max-width: 1136px) and (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const _ShorcutButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 14rem;
  height: 6rem;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
`;
