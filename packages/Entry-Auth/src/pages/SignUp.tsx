import { RedirectURL } from '@/apis/login';
import { useVerifyUserInfo } from '@/apis/verify';
import { AuthTemplate } from '@/components/AuthTemplate';
import DivideSignup from '@/components/DivideSignup';
import { InsertUserInfo } from '@/components/InsertUserInfo';
import { OnAuthorization } from '@/components/OnAuthorization';
import { useToken } from '@/hooks/useToken';
import { removeLocalStorageItem } from '@/utils/localstorage';
import { useEffect, useMemo, useState } from 'react';

export const SignUp = ({ redirectURL }: RedirectURL) => {
  const { token } = useToken();
  const { getUserData } = useVerifyUserInfo(token.mdl_tkn);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    removeLocalStorageItem('isVerified');
  }, []);

  const RenderedComponent = useMemo(() => {
    let component;
    if (getUserData.data?.data) {
      component = (
        <InsertUserInfo isStudent={isStudent} redirectURL={redirectURL} />
      );
    }
    //  else if (token.mdl_tkn) {
    //   component = <OnAuthorization />;
    // }
    else {
      component = <DivideSignup setIsStudent={setIsStudent} />;
    }
    return component;
  }, [redirectURL, getUserData.data?.data, token.mdl_tkn, isStudent]);

  return <AuthTemplate title="회원가입">{RenderedComponent}</AuthTemplate>;
};
