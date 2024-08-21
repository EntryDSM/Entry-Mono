import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import { ISpecialScoreDistribution } from '@/utils/api/admin/types';

export interface IPropsType {
  title: string;
  ranges: string[];
  daejeonRanges?: ISpecialScoreDistribution;
  nationWideRanges?: ISpecialScoreDistribution;
}

export function SpecialScoreCard({ title, ranges, daejeonRanges, nationWideRanges }: IPropsType) {
  return (
    <_ScoreStatus>
      <Text color="black900" size="title2">
        {title}
      </Text>

      <_Boxs>
        <_Box>
          {ranges.map((range) => (
            <Text color="black900" size="title3" width={90}>
              {range}:
            </Text>
          ))}
          <Text color="black900" size="title2" width={90}>
            총합:
          </Text>
        </_Box>
        <_Box>
          <Text color="black900" size="title1">
            대전
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.firstRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.secondRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.thirdRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.fourthRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.fifthRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.sixthRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.seventhRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges?.eighthRate}
          </Text>
          <Text color="black900" size="title2">
            {daejeonRanges
              ? Object.values(daejeonRanges).reduce((acc, cur) => (acc += typeof cur == 'number' ? cur : 0), 0)
              : 0}
          </Text>
        </_Box>
        <_Box>
          <Text color="black900" size="title1">
            전국
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.firstRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.secondRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.thirdRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.fourthRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.fifthRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.sixthRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.seventhRate}
          </Text>
          <Text color="black900" size="title2">
            {nationWideRanges?.eighthRate}
          </Text>
          <Text color="black900" size="title2" width={90}>
            {nationWideRanges
              ? Object.values(nationWideRanges).reduce((acc, cur) => (acc += typeof cur == 'number' ? cur : 0), 0)
              : 0}
          </Text>
        </_Box>
      </_Boxs>
    </_ScoreStatus>
  );
}

const _ScoreStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const _Boxs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 30px;
  background-color: ${theme.color.black50};
  border: 1px solid ${theme.color.black100};
  border-radius: 10px;
  gap: 10px;
`;

const _Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-top: auto;
  > div {
    height: 26.5px;
  }
`;
