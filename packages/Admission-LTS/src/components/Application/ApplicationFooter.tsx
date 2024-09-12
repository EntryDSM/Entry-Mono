import styled from '@emotion/styled';
import { Button, theme } from '@entrydsm/design-system';
import { useModal } from '@/hooks/useModal';
import { IApplicationFooterProps } from '@/interface/type';
import { useEffect, useState } from 'react';

const ApplicationFooter = ({
  current,
  isDisabled,
  prevClick,
  nextClick,
}: IApplicationFooterProps) => {
  const progress = [[0], [1], [2], [3], [4, 5, 6, 7, 8], [9]];
  const { setModalState } = useModal();
  const [tooltip, setTooltip] = useState<'' | 'before' | 'after'>('');

  useEffect(() => {
    console.log(tooltip);
  }, [tooltip]);

  return (
    <_Footer>
      <_ButtonWrapper
        onMouseOver={() => setTooltip('before')}
        onMouseLeave={() => setTooltip('')}
      >
        <_Tooltip
          visible={tooltip === 'before' ? 1 : 0}
          bgColor={theme.color.realWhite}
          color={theme.color.realBlack}
        >
          이전 버튼을 누르면 작성한 내용을 잃어버릴 수도 있습니다
        </_Tooltip>
        <Button
          color="black"
          kind="outlined"
          disabled={current === 0}
          onClick={() => {
            !!prevClick && prevClick();
          }}
        >
          이전
        </Button>
      </_ButtonWrapper>
      <_Progress>
        {progress.map((step) => (
          <_ProgressStep key={step[0]} isStep={step.includes(current)} />
        ))}
      </_Progress>
      <_ButtonWrapper
        onMouseOver={() => setTooltip('after')}
        onMouseLeave={() => setTooltip('')}
      >
        <_Tooltip
          visible={tooltip === 'after' ? 1 : 0}
          bgColor={theme.color.orange400}
          color={theme.color.realWhite}
        >
          다음 버튼을 누르면 진행 상황이 저장됩니다
        </_Tooltip>
        {current !== 9 ? (
          <Button
            color="orange"
            kind="contained"
            onClick={() => {
              !!nextClick && nextClick();
            }}
            disabled={isDisabled}
          >
            다음
          </Button>
        ) : (
          <Button
            color="orange"
            kind="contained"
            onClick={() => setModalState('SUBMIT_MODAL')}
          >
            완료
          </Button>
        )}
      </_ButtonWrapper>
    </_Footer>
  );
};

export default ApplicationFooter;

const _Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60rem;
  margin-top: 45px;
  margin-bottom: 100px;
`;

const _Progress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 38px;
`;

const _ProgressStep = styled.div<{ isStep: boolean }>`
  width: ${({ isStep }) => (isStep ? 22 : 14)}px;
  height: ${({ isStep }) => (isStep ? 22 : 14)}px;
  border-radius: ${({ isStep }) => (isStep ? 11 : 7)}px;
  background-color: ${({ isStep }) =>
    isStep ? theme.color.orange400 : theme.color.black200};
`;

const _ButtonWrapper = styled.div`
  position: relative;
`;

const _Tooltip = styled.div<{
  visible: number;
  bgColor: string;
  color: string;
}>`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  width: max-content;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ bgColor }) => bgColor} transparent transparent
      transparent;
  }
`;
