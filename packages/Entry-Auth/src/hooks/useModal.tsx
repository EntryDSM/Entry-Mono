import { modalDispatch, modalState } from '@/context/modal';
import { useContext } from 'react';

export const useModal = () => {
  const state = useContext(modalState);
  const dispatch = useContext(modalDispatch);

  const render = (payload: {
    title: string;
    content: string;
    icon?: React.ReactElement;
    button: React.ReactElement;
  }) => {
    dispatch({
      type: 'RENDER',
      ...payload,
    });
  };
  const close = () =>
    dispatch({
      type: 'CLOSE',
    });

  return { render, state, close };
};
