import styled from '@emotion/styled';
import { Button, theme } from '@entrydsm/design-system';
import { useModal } from '@/hooks/useModal';
import { IApplicationFooterProps } from '@/interface/type';

const ApplicationFooter = ({
  current,
  isDisabled,
  prevClick,
  nextClick,
}: IApplicationFooterProps) => {
  const progress = [[0], [1], [2], [3], [4, 5, 6, 7, 8], [9]];
  const { setModalState } = useModal();

  return (
    <_Footer>
      <Button
        color="black"
        kind="outlined"
        disabled={current === 0 || isDisabled}
        onClick={() => {
          !!prevClick && prevClick();
        }}
      >
        이전
      </Button>
      <_Progress>
        {progress.map((step) => (
          <_ProgressStep key={step[0]} isStep={step.includes(current)} />
        ))}
      </_Progress>
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
