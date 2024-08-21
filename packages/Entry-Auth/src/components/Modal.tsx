import { useModal } from '@/hooks/useModal';
import styled from '@emotion/styled';
import { AuthTemplate } from './AuthTemplate';

export const Modal = () => {
  const { state } = useModal();
  if (!state.title) return null;
  return (
    <_Wrapper>
      <AuthTemplate title={state.title}>
        <_Content>
          {state.icon && state.icon}
          <p>{state.content}</p>
          {state.button}
        </_Content>
      </AuthTemplate>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  position: absolute;
  z-index: 9999;
`;

const _Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 33px;
  }
  > p {
    white-space: pre-wrap;
    text-align: center;
  }
  > button {
    margin-top: 33px;
    width: 100%;
  }
`;
