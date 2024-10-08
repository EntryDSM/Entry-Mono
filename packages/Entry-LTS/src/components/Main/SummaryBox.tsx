import styled from '@emotion/styled';
import OrangeArrow from '../../assets/OrangeArrow.svg';
import GrayArrow from '../../assets/GrayArrow.svg';

interface SummaryBoxProps {
  title: string;
  content: string;
  idx: number;
  isOpen: boolean;
  setNowOpen: (idx: number) => void;
}

interface T_Details {
  isOpen: boolean;
}

const SummaryBox = ({
  title,
  content,
  idx,
  isOpen,
  setNowOpen,
}: SummaryBoxProps) => {
  return (
    <_FAQContainer isOpen={isOpen} onClick={() => setNowOpen(idx)}>
      <_Number>{`${idx + 1}`.padStart(2, '0')}</_Number>
      <_Details>
        <_Summary>
          <span>{title}</span>
          <img src={isOpen ? OrangeArrow : GrayArrow} width={28} height={28} />
        </_Summary>
        <_ContentBox isOpen={isOpen}>
          <hr />
          <span>{content}</span>
        </_ContentBox>
      </_Details>
    </_FAQContainer>
  );
};

const _Number = styled.p`
  font-size: 28px;
  font-weight: 800;
  height: 100%;
`;

const _FAQContainer = styled.div<T_Details>`
  background-color: ${({ isOpen }) => (isOpen ? '#fff1e9' : '#f8f8f8')};
  color: ${({ isOpen }) => (isOpen ? '#ff5f00' : '#969696')};
  height: ${({ isOpen }) => (isOpen ? 200 : 80)}px;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  /* align-items: center; */
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  & img {
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotate(90deg)')};
  }
`;

const _Details = styled.div`
  color: #494949;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const _Summary = styled.div`
  width: 100%;
  color: #000;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _ContentBox = styled.div<T_Details>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 24px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  & > hr {
    width: 100%;
    height: 1px;
    background-color: #ffcaac;
  }
`;

export default SummaryBox;
