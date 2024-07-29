import { setLocalStorage } from '@/utils/localstorage';
import { useEffect } from 'react';

export const Verify = () => {
  useEffect(() => {
    setLocalStorage('isVerified', 'true');
    window.close();
  }, []);
  return null;
};
