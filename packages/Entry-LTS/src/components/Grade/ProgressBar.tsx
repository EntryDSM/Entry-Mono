import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import { GradeStatusType } from '@/interfaces/grade';

interface IProgressBarProps {
  step: number;
  gradeStatus: GradeStatusType;
}

const ProgressBar = ({ step, gradeStatus }: IProgressBarProps) => {
  let progress = [];
  let title = [];
  switch (gradeStatus) {
    case 'graduate':
      progress = [
        { element: <_Circle key={1} isNow={1 <= step} delay={0} /> },
        {
          element: (
            <_Line
              key={2}
              isNow={2 <= step}
              gradeStatus={gradeStatus}
              delay={1}
            />
          ),
        },
        { element: <_Circle key={3} isNow={2 <= step} delay={2} /> },
        {
          element: (
            <_Line
              key={4}
              isNow={3 <= step}
              gradeStatus={gradeStatus}
              delay={3}
            />
          ),
        },
        { element: <_Circle key={5} isNow={3 <= step} delay={4} /> },
        {
          element: (
            <_Line
              key={6}
              isNow={4 <= step}
              gradeStatus={gradeStatus}
              delay={5}
            />
          ),
        },
        { element: <_Circle key={7} isNow={4 <= step} delay={6} /> },
        {
          element: (
            <_Line
              key={8}
              isNow={5 <= step}
              gradeStatus={gradeStatus}
              delay={7}
            />
          ),
        },
        { element: <_Circle key={9} isNow={5 <= step} delay={8} /> },
      ];
      title = [
        '3학년 2학기',
        '3학년 1학기',
        '2학년 2학기',
        '2학년 1학기',
        '출석 및 봉사',
      ];
      break;
    case 'prospectiveGraduate':
      progress = [
        { element: <_Circle key={1} isNow={1 <= step} delay={0} /> },
        {
          element: (
            <_Line
              key={2}
              isNow={2 <= step}
              gradeStatus={gradeStatus}
              delay={1}
            />
          ),
        },
        { element: <_Circle key={3} isNow={2 <= step} delay={2} /> },
        {
          element: (
            <_Line
              key={4}
              isNow={3 <= step}
              gradeStatus={gradeStatus}
              delay={3}
            />
          ),
        },
        { element: <_Circle key={5} isNow={3 <= step} delay={4} /> },
        {
          element: (
            <_Line
              key={6}
              isNow={4 <= step}
              gradeStatus={gradeStatus}
              delay={5}
            />
          ),
        },
        { element: <_Circle key={7} isNow={4 <= step} delay={6} /> },
      ];
      title = ['3학년 1학기', '직전 학기', '직전전 학기', '출석 및 봉사'];
      break;
    case 'qualificationExam':
      progress = [
        { element: <_Circle key={1} isNow={1 <= step} delay={0} /> },
        {
          element: (
            <_Line
              style={{ width: '100%' }}
              key={2}
              isNow={2 <= step}
              gradeStatus={gradeStatus}
              delay={1}
            />
          ),
        },
        { element: <_Circle key={3} isNow={2 <= step} delay={2} /> },
      ];
      title = ['검정고시 점수', '자격증 및 수상'];
  }

  return (
    <>
      <_Wrapper>
        {progress.map((res) => {
          return res.element;
        })}
      </_Wrapper>
      <_Texts>
        {title.map((item, idx) => (
          <Text key={idx} color="black800" size="body5">
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

const _Circle = styled.div<{ isNow?: boolean; delay?: number }>`
  width: 1.3rem;
  height: 1.3rem;
  background-color: ${({ isNow }) =>
    isNow ? theme.color.orange500 : theme.color.realWhite};
  border-radius: 50px;
  border: 4px solid
    ${({ isNow }) => (isNow ? theme.color.orange500 : theme.color.black100)};
  margin: 0 0.9rem;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out ${({ delay }) => delay * 0.2}s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const _Line = styled.div<{
  isNow?: boolean;
  gradeStatus?: GradeStatusType;
  delay?: number;
}>`
  width: ${({ gradeStatus }) => (gradeStatus === 'graduate' ? 18 : 25)}%;
  height: 0.15rem;
  border-radius: 5px;
  background-color: ${({ isNow }) =>
    isNow ? theme.color.orange500 : theme.color.black100};
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out ${({ delay }) => delay * 0.2}s forwards;
`;
