import { RedirectURL } from '@/apis/login';
import { useVerifyUserInfo } from '@/apis/verify';
import { AuthTemplate } from '@/components/AuthTemplate';
import DivideSignup from '@/components/DivideSignup';
import { InsertUserInfo } from '@/components/InsertUserInfo';
import { useToken } from '@/hooks/useToken';
import { removeLocalStorageItem } from '@/utils/localstorage';
import { useEffect, useMemo, useState } from 'react';

export const SignUp = ({ redirectURL }: RedirectURL) => {
  const { token } = useToken();
  const { getUserData } = useVerifyUserInfo(token.mdl_tkn);
  const [isParent, setIsParent] = useState(true);

  useEffect(() => {
    removeLocalStorageItem('isVerified');
  }, []);

  const RenderedComponent = useMemo(() => {
    let component;
    if (getUserData.data) {
      component = (
        <InsertUserInfo isParent={isParent} redirectURL={redirectURL} />
      );
    }
    //  else if (token.mdl_tkn) {
    //   component = <OnAuthorization />;
    // }
    else {
      component = <DivideSignup setIsParent={setIsParent} />;
    }
    return component;
  }, [redirectURL, token.mdl_tkn, isParent, getUserData.data]);
  return <AuthTemplate title="회원가입">{RenderedComponent}</AuthTemplate>;
};
