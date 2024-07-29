import { useAdminLogin } from '@/apis/adminLogin';
import { RedirectURL, useLogin } from '@/apis/login';
import { AuthTemplate } from '@/components/AuthTemplate';
import { AuthLinks } from '@/components/Links';
import { SubmitForm } from '@/components/SubmitForm';
import { MAIN_URL } from '@/constant/env';
import { useForm } from '@/hooks/useForm';
import { isTruthValues } from '@/utils/isTruthValues';
import styled from '@emotion/styled';
import { Button, Input } from '@team-entry/design_system';

interface ILogin extends RedirectURL {
  isAdmin?: boolean;
}

export const Login = ({ redirectURL, isAdmin = false }: ILogin) => {
  const { state, onChangeInputValue } = useForm({
    phoneNumber: '',
    password: '',
  });

  const { mutate: userLogin } = useLogin(redirectURL);
  const { mutate: adminLogin } = useAdminLogin();

  return (
    <SubmitForm>
      <AuthTemplate
        title="로그인"
        padding="102px 50px"
        withUnderLine
        isAdmin={isAdmin}
      >
        <Input
          margin={['top', 20]}
          width="100%"
          unit=""
          label={isAdmin ? '아이디' : '전화번호'}
          type={isAdmin ? 'text' : 'tel'}
          placeholder={isAdmin ? '아이디' : '전화번호'}
          name="phoneNumber"
          onChange={onChangeInputValue}
          value={state.phoneNumber}
          maxLength={13}
        />
        <Input
          margin={['top', 35]}
          width="100%"
          unit=""
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={onChangeInputValue}
          value={state.password}
          maxLength={32}
        />
        <_Button
          kind="contained"
          onClick={() =>
            (isAdmin
              ? adminLogin({
                adminId: state.phoneNumber,
                password: state.password,
              })
              : userLogin({
                phoneNumber: state.phoneNumber.replace(/-/g, ''),
                password: state.password,
              }))}
          margin={['top', 45]}
          color={isAdmin ? 'green' : 'orange'}
          disabled={!isTruthValues([state.phoneNumber, state.password])}
        >
          로그인
        </_Button>
        <AuthLinks isAdmin={isAdmin} />
        <_Button
          kind="outlined"
          color="black"
          onClick={() => {
            window.location.href = `${MAIN_URL}`;
          }}
        >
          홈으로 돌아가기
        </_Button>
      </AuthTemplate>
    </SubmitForm>
  );
};

const _Button = styled(Button)`
  width: 100%;
`;
