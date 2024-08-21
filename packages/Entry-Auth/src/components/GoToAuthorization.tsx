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
    openPopUp.mutate(`${AUTH_URL}/verify`);
  };

  return (
    <>
      <Text color="#000000" size="18" align="center" margin={['top', 33]}>
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
    </>
  );
};

const _Button = styled(Button)`
  width: 100%;
  margin-top: 33px;
`;
