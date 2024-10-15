import styled from '@emotion/styled';
import { Text, VStack, theme } from '@entrydsm/design-system';
import { CommonScoreCard } from '@/components/CommonScoreCard';
import { SpecialScoreCard } from '@/components/SpecialScoreCard';
import {
  getStaticCounts,
  getStaticLocation,
  getStaticsScore,
} from '@/utils/api/admin';

function ReceptionStatus() {
  const { data: staticsScoreData } = getStaticsScore();
  const { data: staticCountsData } = getStaticCounts();
  const { data: staticLocationData } = getStaticLocation();

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

  const allCommon = 160;
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
          {(allReception / 64).toFixed(2)} : 1
        </Text>
      </_StatusCount>
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
        <_Application percent={commonPercent * 100}>
          <_ApplicationText
            margin={[0, 0, 0, 12]}
            color="realWhite"
            size="body1"
          >
            {`${allReception}명`}
          </_ApplicationText>
        </_Application>
      </div>

      <div style={{ width: '100%' }}>
        <Text color="black900" size="header2" margin={[0, 0, 20, 0]}>
          분야 및 지역별 경쟁률
        </Text>
        <div style={{ display: 'flex', gap: 20, width: '100%' }}>
          <_CompetitionRate>
            <Text color="black900" size="header3">
              대전
            </Text>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                일반전형: {+(daejeonCommon / 25).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${daejeonCommon}명 : 0명 )`}
              </Text>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                마이스터 전형: {+(daejeonMeister / 6).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${daejeonMeister}명 : 0명 )`}
              </Text>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                사회통합 전형: {+(daejeonSocial / 1).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${daejeonSocial}명 : 0명 )`}
              </Text>
            </div>
          </_CompetitionRate>

          <_CompetitionRate>
            <Text color="black900" size="header3">
              전국
            </Text>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                일반전형: {+(everyCommon / 25).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${everyCommon}명 : 0명 )`}
              </Text>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                마이스터 전형: {+(everyMeister / 6).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${everyMeister}명 : 0명 )`}
              </Text>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text color="black900" size="title3">
                사회통합 전형: {+(everySocial / 1).toFixed(2)} : 1
              </Text>
              <Text color="black900" size="title3">
                {`( ${everySocial}명 : 0명 )`}
              </Text>
            </div>
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

      <div style={{ width: '100%' }}>
        <Text color="black900" size="header2" margin={[0, 0, 20, 0]}>
          지역별 접수 현황
        </Text>
        <_LocationRate>
          {Object.entries(staticLocationData ?? {}).map((item, index) => (
            <Text color={'black900'} size={'body2'} key={index}>
              {item[0]}: {item[1]}
            </Text>
          ))}
        </_LocationRate>
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

const _LocationRate = styled.div`
  display: grid;
  padding: 30px;
  width: 100%;
  background-color: ${theme.color.black50};
  border: 1px solid ${theme.color.black100};
  border-radius: 10px;
  gap: 30px;

  grid-template-columns: repeat(5, 1fr);

  & > * {
    grid-column: span 1;
  }
`;
