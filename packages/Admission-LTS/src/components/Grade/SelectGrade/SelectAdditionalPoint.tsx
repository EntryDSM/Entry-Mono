import { InputType, Text, theme } from '@entrydsm/design-system';
import styled from '@emotion/styled';
import { ExtraScore, IWriteGradeElement } from '@/apis/score/type';
import { SetStateAction } from 'react';

interface ISelectAdditional {
  title: string;
  name: keyof ExtraScore;
  writeGradeElement: IWriteGradeElement;
  setWriteGradeElement: React.Dispatch<SetStateAction<IWriteGradeElement>>;
}

const SelectAdditionalPoint = ({
  title,
  name,
  writeGradeElement,
  setWriteGradeElement,
}: ISelectAdditional) => {
  const onClick = (have: boolean) => {
    setWriteGradeElement((current: IWriteGradeElement) => ({
      ...current,
      extraScore: { ...current.extraScore, [name]: have },
    }));
  };

  const isClickChecker = (value: boolean) => {
    console.log(writeGradeElement.extraScore[name as keyof ExtraScore], name);
    if (name in writeGradeElement.extraScore) {
      return writeGradeElement.extraScore[name as keyof ExtraScore] === value;
    }
  };

  return (
    <_Wrapper>
      <_Texts>
        <Text color="black900" size="title1">
          {title}
        </Text>
      </_Texts>
      <_Buttons>
        <_Button
          key={'O'}
          onClick={() => onClick(true)}
          isClick={isClickChecker(true)}
        >
          O
        </_Button>
        <_Button
          key={'X'}
          onClick={() => onClick(false)}
          isClick={isClickChecker(false)}
        >
          X
        </_Button>
      </_Buttons>
    </_Wrapper>
  );
};

export default SelectAdditionalPoint;

const _Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  width: 100%;
  border-top: 1px solid ${theme.color.black100};
  padding: 25px 10px;
  &:last-child {
    border-bottom: 1px solid ${theme.color.black100};
  }
`;

const _Buttons = styled.div`
  width: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _Button = styled.div<{ isClick?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50px;
  ${theme.font.title2};
  border: 1px solid ${theme.color.orange500};
  color: ${({ isClick }) =>
    isClick ? theme.color.realWhite : theme.color.orange500};
  background-color: ${({ isClick }) =>
    isClick ? theme.color.orange500 : theme.color.realWhite};
  cursor: pointer;
`;

const _Texts = styled.div`
  display: flex;
  align-items: center;
`;
