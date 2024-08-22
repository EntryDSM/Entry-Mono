import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { ADMIN_URL, AUTH_URL } from './constant/env';

function App() {
  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken');
  const refreshToken = cookie.get('refreshToken');
  const authority = cookie.get('authority');
  useEffect(() => {
    if (!accessToken || !refreshToken) {
      alert('로그인 후 이용 가능합니다');
      window.location.href = `${AUTH_URL}/admin-login?redirect_url=${ADMIN_URL}`;
    } else if (authority != 'admin') {
      alert('권한이 없습니다.');
      window.location.href = `${AUTH_URL}/admin-login?redirect_url=${ADMIN_URL}`;
    }
  }, [accessToken, refreshToken, authority]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
