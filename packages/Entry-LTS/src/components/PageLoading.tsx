import { useAuthority } from '@/hooks/useAuthority';
import styled from '@emotion/styled';
import { Spinner } from '@entrydsm/design-system';

type PropsType = {
  isVisible: boolean;
};

export const PageLoading = ({ isVisible }: PropsType) => {
  const { authorityColor } = useAuthority();

  return (
    <>
      {isVisible && (
        <Wrapper>
          <Spinner size={48} color={authorityColor} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;
