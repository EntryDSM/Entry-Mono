import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import ApplicationPage from './pages/Application';
import { APPLY_URL, AUTH_URL, MAIN_URL } from './constant/env';
import { Cookies } from 'react-cookie';

export const Router = () => {
  useEffect(() => {
    alert('원서접수가 마감되었습니다.');
    window.location.href = `${MAIN_URL}`;
  }, []);

  const cookie = new Cookies();
  const refreshToken = cookie.get('refreshToken');
  const accessToken = cookie.get('accessToken');

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      window.location.href = `${AUTH_URL}/login?redirect_url=${APPLY_URL}`;
    }
  }, [accessToken, refreshToken]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
