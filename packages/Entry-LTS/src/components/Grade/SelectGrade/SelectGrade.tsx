import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import { gradeArr } from '../../../constant/grade';
import { GradeType, ISelectGradeElement } from '@/interfaces/grade';

interface ISelectGrade {
  title: string;
  gradesKey: keyof ISelectGradeElement;
  selectGradeElement: ISelectGradeElement;
  setSelectGradeElement: React.Dispatch<
    React.SetStateAction<ISelectGradeElement>
  >;
  current: number;
}

const SelectGrade = ({
  title,
  gradesKey,
  selectGradeElement,
  setSelectGradeElement,
  current,
}: ISelectGrade) => {
  const onClick = (grade: GradeType) => {
    const oldArray = selectGradeElement[gradesKey];
    oldArray[current] = grade;
    setSelectGradeElement({ ...selectGradeElement, [gradesKey]: oldArray });
  };
  return (
    <_Wrapper>
      <_Texts>
        <Text style={{ whiteSpace: 'nowrap' }} color="black900" size="title1">
          {title}
        </Text>
      </_Texts>
      <_Buttons>
        {gradeArr.map((grade: GradeType) => (
          <_Button
            key={grade}
            onClick={() => {
              onClick(grade);
            }}
            isClick={grade === selectGradeElement[gradesKey][current]}
          >
            <_ClickButton
              click={grade === selectGradeElement[gradesKey][current]}
            />
            {grade}
          </_Button>
        ))}
      </_Buttons>
    </_Wrapper>
  );
};

export default SelectGrade;

const _Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 48px;
  border-top: 1px solid ${theme.color.black100};
  padding: 12px 0;
  &:last-child {
    border-bottom: 1px solid ${theme.color.black100};
  }
  @media (max-width: 560px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }
`;

const _Buttons = styled.div`
  display: flex;
  max-width: 36rem;
  width: 100%;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const _Button = styled.div<{ isClick?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.8rem;
  min-height: 2.8rem;
  border-radius: 50px;
  ${theme.font.title2};
  border: 1px solid ${theme.color.orange500};
  color: ${({ isClick }) =>
    isClick ? theme.color.realWhite : theme.color.orange500};
  /* background-color: ${({ isClick }) =>
    isClick ? theme.color.orange500 : theme.color.realWhite}; */
  cursor: pointer;
`;

const _Texts = styled.div`
  display: flex;
  align-items: center;
`;

const _ClickButton = styled.div<{ click?: boolean }>`
  position: absolute;
  width: ${({ click }) => (click ? 2.8 : 0)}rem;
  height: ${({ click }) => (click ? 2.8 : 0)}rem;
  border-radius: 50px;
  background-color: ${({ click }) =>
    click ? theme.color.orange500 : theme.color.realWhite};
  transition: all 0.1s ease-in;
  z-index: -20;
`;
