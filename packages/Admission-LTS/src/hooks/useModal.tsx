import { useCallback } from 'react';
import { useModalStateStore } from '@/store/useModalStateStore';

export const useModal = () => {
  const { modalState, setModalState } = useModalStateStore();

  const close = useCallback(() => {
    setModalState('');
  }, []);

  return {
    close,
    modalState,
    setModalState,
  };
};
