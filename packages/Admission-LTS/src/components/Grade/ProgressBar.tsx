import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import { GetUserType } from '@/apis/application';

const ProgressBar = ({ step = 1 }: { step: number }) => {
  const { data: userType } = GetUserType();
  const isGraduate = userType?.educationalStatus === 'GRADUATE';
  const isBlackExam = userType?.educationalStatus === 'QUALIFICATION_EXAM';
  const progess = isGraduate
    ? [
        { element: <_Circle key={1} isNow={1 <= step} /> },
        {
          element: <_Line key={2} isNow={2 <= step} isGraduate={isGraduate} />,
        },
        { element: <_Circle key={3} isNow={2 <= step} /> },
        {
          element: <_Line key={4} isNow={3 <= step} isGraduate={isGraduate} />,
        },
        { element: <_Circle key={5} isNow={3 <= step} /> },
        {
          element: <_Line key={6} isNow={4 <= step} isGraduate={isGraduate} />,
        },
        { element: <_Circle key={7} isNow={4 <= step} /> },
        {
          element: <_Line key={8} isNow={5 <= step} isGraduate={isGraduate} />,
        },
        { element: <_Circle key={9} isNow={5 <= step} /> },
      ]
    : isBlackExam
      ? []
      : [
          { element: <_Circle key={1} isNow={1 <= step} /> },
          {
            element: (
              <_Line key={2} isNow={2 <= step} isGraduate={isGraduate} />
            ),
          },
          { element: <_Circle key={3} isNow={2 <= step} /> },
          {
            element: (
              <_Line key={4} isNow={3 <= step} isGraduate={isGraduate} />
            ),
          },
          { element: <_Circle key={5} isNow={3 <= step} /> },
          {
            element: (
              <_Line key={6} isNow={4 <= step} isGraduate={isGraduate} />
            ),
          },
          { element: <_Circle key={7} isNow={4 <= step} /> },
        ];

  const title = isGraduate
    ? [
        '3학년 2학기',
        '3학년 1학기',
        '2학년 2학기',
        '2학년 1학기',
        '출석 및 봉사',
      ]
    : isBlackExam
      ? ['가산점 입력']
      : ['3학년 1학기', '직전 학기', '직전전 학기', '출석 및 봉사'];

  return (
    <>
      <_Wrapper>
        {progess.map((res) => {
          return res.element;
        })}
      </_Wrapper>
      <_Texts>
        {title.map((item) => (
          <Text color="black800" size="body5">
            {item}
          </Text>
        ))}
      </_Texts>
    </>
  );
};

export default ProgressBar;

const _Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 8px 0;
`;

const _Texts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const _Circle = styled.div<{ isNow?: boolean }>`
  width: 1.3rem;
  height: 1.3rem;
  background-color: ${({ isNow }) =>
    isNow ? theme.color.orange500 : theme.color.realWhite};
  border-radius: 50px;
  border: 4px solid
    ${({ isNow }) => (isNow ? theme.color.orange500 : theme.color.black100)};
  margin: 0 0.9rem;
`;

const _Line = styled.div<{ isNow?: boolean; isGraduate?: boolean }>`
  width: ${({ isGraduate }) => (isGraduate ? 18 : 25)}%;
  height: 0.15rem;
  border-radius: 5px;
  background-color: ${({ isNow }) =>
    isNow ? theme.color.orange500 : theme.color.black100};
`;
