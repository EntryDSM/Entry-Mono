import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
// import { ISpecialScoreDistribution } from '@/utils/api/admin/types';

interface IScoreDistribution {
  isDaejeon: boolean;
  applicationType: 'COMMON' | 'MEISTER' | 'SOCIAL';
  totalScore: number[];
}

export interface IPropsType {
  title: string;
  ranges: string[];
  daejeonData?: IScoreDistribution;
  nationWideData?: IScoreDistribution;
}

export function SpecialScoreCard({
  title,
  ranges,
  daejeonData,
  nationWideData,
}: IPropsType) {
  const getScoreForRange = (
    data: IScoreDistribution | undefined,
    index: number,
  ) => {
    return data && Array.isArray(data.totalScore)
      ? data.totalScore[index] || 0
      : 0;
  };

  const calculateTotal = (data: IScoreDistribution | undefined) => {
    return data && Array.isArray(data.totalScore)
      ? data.totalScore.reduce((acc, cur) => acc + cur, 0)
      : 0;
  };

  return (
    <_ScoreStatus>
      <Text color="black900" size="title2">
        {title}
      </Text>

      <_Boxs>
        <_Box>
          {ranges.map((range, index) => (
            <Text key={index} color="black900" size="title3" width={90}>
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
          {ranges.map((_, index) => (
            <Text key={index} color="black900" size="title2">
              {getScoreForRange(daejeonData, index)}
            </Text>
          ))}
          <Text color="black900" size="title2">
            {calculateTotal(daejeonData)}
          </Text>
        </_Box>
        <_Box>
          <Text color="black900" size="title1">
            전국
          </Text>
          {ranges.map((_, index) => (
            <Text key={index} color="black900" size="title2">
              {getScoreForRange(nationWideData, index)}
            </Text>
          ))}
          <Text color="black900" size="title2" width={90}>
            {calculateTotal(nationWideData)}
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
