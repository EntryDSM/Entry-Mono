import React, { useCallback, useState } from 'react';
import Modal from '@/components/Modal';

type ModalPropsType = {
  useBlur?: boolean;
  defaultState?: boolean;
};

export type ModalType =
  | ''
  | 'CANCEL_SUBMIT'
  | 'SIGN_OUT'
  | 'LOGOUT'
  | 'SUBMIT_GRADE'
  | 'START_NOTICE'
  | 'PASSED_ROUND'
  | 'NOT_PASSED_ROUND'
  | 'USER_DELETE';

// `useBlur` props로 모달 외부를 클릭하면 모달을 닫을지 선택
export const useModal = ({
  useBlur = true,
  defaultState = false,
}: ModalPropsType = {}) => {
  const [isOpen, setIsOpen] = useState(defaultState);
  const [modalState, setModalState] = useState<ModalType>('');

  const open = useCallback(() => {
    setIsOpen(() => true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(() => false);
    setModalState('');
  }, []);

  const ModalComponent = ({
    children,
    isConfetti = false,
  }: {
    children: React.ReactNode;
    isConfetti?: boolean;
  }) => {
    return isOpen ? (
      <Modal
        close={false}
        onClose={useBlur ? close : undefined}
        isConfetti={isConfetti}
      >
        {children}
      </Modal>
    ) : null;
  };

  return {
    Modal: ModalComponent,
    open,
    close,
    isOpen,
    modalState,
    setModalState,
  };
};
