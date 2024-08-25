import styled from '@emotion/styled';
import { Text, VStack, theme } from '@entrydsm/design-system';
import { CommonScoreCard } from '@/components/CommonScoreCard';
import { SpecialScoreCard } from '@/components/SpecialScoreCard';
import { getStaticCounts, getStaticsScore } from '@/utils/api/admin';

function ReceptionStatus() {
  const { data: staticsScoreData } = getStaticsScore();
  const { data: staticCountsData } = getStaticCounts();

  const everyCommon = staticCountsData?.[0]?.count ?? 0;
  const daejeonCommon = staticCountsData?.[1]?.count ?? 0;
  const everyMeister = staticCountsData?.[2]?.count ?? 0;
  const daejeonMeister = staticCountsData?.[3]?.count ?? 0;
  const everySocial = staticCountsData?.[4]?.count ?? 0;
  const daejeonSocial = staticCountsData?.[5]?.count ?? 0;
  const allReception =
    everyCommon +
    everyMeister +
    everySocial +
    daejeonCommon +
    daejeonMeister +
    daejeonSocial;

  const allCommon = 50;
  const allMeister = 12;
  const allSocial = 2;

  const commonPercent = +((everyCommon + daejeonCommon) / allCommon).toFixed(2);
  const meisterPercent = +(
    (everyMeister + daejeonMeister) /
    allMeister
  ).toFixed(2);
  const socialPercent = +((everySocial + daejeonSocial) / allSocial).toFixed(2);

  return (
    <_Wrapper>
      <Text size="header1" color="black900">
        접수 현황
      </Text>
      <_StatusCount>
        <Text color="black900" size="title3">
          총 지원자 수:
        </Text>
        <Text color="black900" size="title1">
          {allReception}명
        </Text>
        <Text color="black900" size="title3" margin={[0, 0, 0, 4]}>
          총 경쟁률:
        </Text>
        <Text color="black900" size="title1">
          {(allReception / (allCommon + allMeister + allSocial)).toFixed(2)} : 1
        </Text>
      </_StatusCount>
      <Text color="black900" size="header2">
        신입생 전형유형별 지원률
      </Text>

      <_GraphWrapper>
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
      </_GraphWrapper>

      <div style={{ width: '100%' }}>
        <Text color="black900" size="header2" margin={[0, 0, 20, 0]}>
          분야 및 지역별 경쟁률
        </Text>
        <div style={{ display: 'flex', gap: 20, width: '100%' }}>
          <_CompetitionRate>
            <Text color="black900" size="header3">
              대전
            </Text>
            <Text color="black900" size="title3">
              일반전형: {+(daejeonCommon / 25).toFixed(2)} : 1
            </Text>
            <Text color="black900" size="title3">
              마이스터 전형: {+(daejeonMeister / 6).toFixed(2)} : 1
            </Text>
            <Text color="black900" size="title3">
              사회통합 전형: {+(daejeonSocial / 1).toFixed(2)} : 1
            </Text>
          </_CompetitionRate>
          <_CompetitionRate>
            <Text color="black900" size="header3">
              전국
            </Text>
            <Text color="black900" size="title3">
              일반전형: {+(everyCommon / 25).toFixed(2)} : 1
            </Text>
            <Text color="black900" size="title3">
              마이스터 전형: {+(everyMeister / 6).toFixed(2)} : 1
            </Text>
            <Text color="black900" size="title3">
              사회통합 전형: {+(everySocial / 1).toFixed(2)} : 1
            </Text>
          </_CompetitionRate>
        </div>
      </div>
      <Text color="black900" size="header2">
        전형 및 지역별 점수 현황
      </Text>
      <div style={{ display: 'flex', gap: 20, width: '100%' }}>
        <CommonScoreCard
          title="일반 전형"
          ranges={[
            '170+ ',
            '161~170',
            '151~160',
            '141~150',
            '131~140',
            '121~130',
            '111~120',
            '101~110',
            '91~100',
            '81~90',
            '71~80',
            '61~70',
            '51~60',
            '0~50',
          ]}
          daejeonData={staticsScoreData?.[0]}
          nationWideData={staticsScoreData?.[1]}
        />
        <SpecialScoreCard
          title="마이스터 전형"
          ranges={[
            '110+ ',
            '101-110',
            '91-100',
            '81-90',
            '71-80',
            '61-70',
            '51-60',
            '41-50',
            '0~40',
          ]}
          daejeonData={staticsScoreData?.[2]}
          nationWideData={staticsScoreData?.[3]}
        />
        <SpecialScoreCard
          title="사회통합 전형"
          ranges={[
            '110+ ',
            '101-110',
            '91-100',
            '81-90',
            '71-80',
            '61-70',
            '51-60',
            '41-50',
            '0~40',
          ]}
          daejeonData={staticsScoreData?.[4]}
          nationWideData={staticsScoreData?.[5]}
        />
      </div>
    </_Wrapper>
  );
}

export default ReceptionStatus;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 65rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px 200px 20px;
  margin-top: 7rem;
  gap: 40px;
`;

const _StatusCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${theme.color.black100};
  border-radius: 10px;
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
  width: 80%;
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

const _CompetitionRate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  background-color: ${theme.color.black50};
  border: 1px solid ${theme.color.black100};
  border-radius: 10px;
  gap: 10px;
`;
