import { useOpenPopUp } from '@/apis/popup';
import { AUTH_URL } from '@/constant/env';
import styled from '@emotion/styled';
import { Button, Text } from '@team-entry/design_system';

interface Props {
  text: string;
}

export const GoToAuthorization = ({ text }: Props) => {
  const { openPopUp } = useOpenPopUp();

  console.log(AUTH_URL);

  const goToAuthorization = () => {
    openPopUp.mutate(`https://auth-stag.entrydsm.hs.kr/verify`);
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
  width: 100% !important;
  margin-top: 33px;
`;
