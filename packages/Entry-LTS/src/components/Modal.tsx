import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Icon, theme } from '@entrydsm/design-system';

const Modal = ({ children, onClose, close = true }: { children: ReactNode; onClose: () => void; close?: boolean }) => {
  return (
    <Background onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {close && (
          <_CloseIcon
            cursor={!!onClose ? 'pointer' : 'not-allowed'}
            onClick={onClose}
            size={24}
            icon="Close"
            color="black900"
          />
        )}
        {children}
      </ModalContainer>
    </Background>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  overflow: hidden;
  z-index: 100;
`;

const _CloseIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 101;
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  min-height: 300px;
  background-color: ${theme.color.realWhite};
  border-radius: 10px;
  padding: 50px;
  @media screen and (max-width: 769px) {
    width: 320px;
  }
`;
