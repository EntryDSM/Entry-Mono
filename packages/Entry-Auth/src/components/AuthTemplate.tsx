import styled from '@emotion/styled';
import Bg from '../assets/bg.png';
import AdminBg from '../assets/adminBg.png';

interface PropsType {
  children: React.ReactNode;
  title: string;
  withUnderLine?: boolean;
  width?: number;
  padding?: string;
  isAdmin?: boolean;
}

export const AuthTemplate = ({
  children,
  width = 500,
  title,
  withUnderLine,
  padding = '50px',
  isAdmin = false,
}: PropsType) => {
  return (
    <_Wrapper>
      <_Image src={isAdmin ? AdminBg : Bg} alt="" />
      <_Box width={width} padding={padding}>
        <_Title>{title}</_Title>
        {withUnderLine && <_Divider isAdmin={isAdmin} />}
        {children}
      </_Box>
    </_Wrapper>
  );
};

const _Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  > svg {
    width: 100vw;
    height: 100vh;
  }

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

const _Box = styled.div<{
  width: number;
  padding: string;
}>`
  position: absolute;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  padding: ${(props) => props.padding};
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const _Image = styled.img`
  object-fit: contain;
  width: 100vw;
  height: 100vh;
`;

const _Title = styled.h1`
  ${({ theme }) => theme.font.header2};
  text-align: center;
`;

const _Divider = styled.hr<{ isAdmin: boolean }>`
  width: 50px;
  height: 2px;
  background-color: ${({ theme, isAdmin }) =>
    (isAdmin ? theme.color.green300 : theme.color.orange300)};
  margin: 20px auto 0 auto;
`;
