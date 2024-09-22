import { useOpenPopUp } from '@/apis/popup';
import { AUTH_URL } from '@/constant/env';
import styled from '@emotion/styled';
import { Button, Text } from '@team-entry/design_system';

interface Props {
  text: string;
}

export const GoToAuthorization = ({ text }: Props) => {
  const { openPopUp } = useOpenPopUp();

  const goToAuthorization = () => {
    openPopUp.mutate(`${AUTH_URL}/sign-up/verify`);
  };

  return (
    <_Box>
      <Text color="#000000" size="body2" align="center" margin={['top', 32]}>
        {text}
      </Text>
      <_Button
        kind="contained"
        color="orange"
        cursor="pointer"
        onClick={goToAuthorization}
      >
        본인 인증
      </_Button>
    </_Box>
  );
};

const _Button = styled(Button)`
  width: 100% !important;
`;

const _Box = styled.div`
  width: 100%;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;
