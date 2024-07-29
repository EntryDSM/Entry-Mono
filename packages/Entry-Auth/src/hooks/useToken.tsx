import { tokenDispatch, tokenValue } from '@/context/token';
import { useContext } from 'react';

export const useToken = () => {
  const token = useContext(tokenValue);
  const dispatch = useContext(tokenDispatch);

  const setToken = (mdl_tkn: string) => {
    dispatch({
      type: 'SET',
      mdl_tkn,
    });
  };

  const clearToken = () => {
    dispatch({
      type: 'CLEAR',
    });
  };

  return {
    token,
    setToken,
    clearToken,
  };
};
