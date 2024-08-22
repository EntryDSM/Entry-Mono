import { Routes, Route } from 'react-router';
import { Login } from '@/pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { ChangePwd } from './pages/ChangePwd';
import { NotFound } from './pages/404';
import { Pass } from './components/Pass';
import { Verify } from './pages/Verify';
import { getQueryValues } from './utils/getQueryValues';
import { MAIN_URL } from './constant/env';

export const Router = () => {
  const redirectURL = getQueryValues().get('redirect_url') || `${MAIN_URL}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login redirectURL={redirectURL} />} />
        <Route
          path="/admin-login"
          element={<Login redirectURL={redirectURL} isAdmin />}
        />
        <Route path="/sign-up" element={<SignUp redirectURL={redirectURL} />} />
        <Route path="/change-pwd" element={<ChangePwd />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/pass" element={<Pass />} />
      </Routes>
    </BrowserRouter>
  );
};
