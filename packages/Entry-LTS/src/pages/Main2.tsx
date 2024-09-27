import styled from '@emotion/styled';
import { Button, Text } from '@entrydsm/design-system';
import MainBgImg from '@/assets/MainBgImg.png';
import Schedule from '@/components/Main2/Schedule';
import Faq from '@/components/Main/Faq';
import ApplyandNotice from '@/components/Main/ApplyandNotice';
import { getSchedule } from '@/utils/api/schedule';
import { scheduleStatusCalculater } from '@/utils/scheduleCalculater';
import { useNavigate } from 'react-router-dom';
import { APPLY_URL } from '@/constant/env';
import { useAuthority } from '@/hooks/useAuthority';
import { getCookies } from '@/utils/cookies';
import { getDocumentInfo } from '@/utils/api/application';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';

const Main2 = () => {
  const { data } = getSchedule();
  const { isAdmin, authorityColor } = useAuthority();
  const accessToken = getCookies('accessToken');
  const [isLogin, setIsLogin] = useState(!!getCookies('accessToken'));
  const { data: documentInfo, isLoading: documentInfoLoading } =
    getDocumentInfo(isLogin);
  const {
    Modal,
    isOpen: isModalOpened,
    close,
  } = useModal({ defaultState: false });

  const navigate = useNavigate();

  const isOpen = () => {
    const currentDate = new Date();
    const startDate = new Date(data?.schedules[0]?.date ?? '');
    const endDate = new Date(data?.schedules[4]?.date ?? '');

    return !(currentDate >= startDate && currentDate <= endDate);
  };

  useEffect(() => {
    setIsLogin(!!getCookies('accessToken'));
  }, [getCookies('accessToken')]);

  return (
    <>
      {isModalOpened && (
        <Modal>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              모의 접수에 참여해 주셔서 감사합니다.
            </div>
            <div
              style={{
                fontSize: '20px',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              접수 과정에서 문제가 발생하면
              <br />
              아래 번호로 전화주시기 바랍니다.
              <br />
              042-866-8811, 8822, 8814
            </div>
            <Button onClick={close}>닫기</Button>
          </div>
        </Modal>
      )}
      <_Wrapper>
        <_TopContainerWrapper>
          <_TopContainer>
            <_Box>
              <_Title>
                <span style={{ color: '#FF9900' }}>
                  대덕소프트웨어마이스터고
                </span>
                는 지금,
                <br />
                IT 업계를 선도할 미래 인재를 모집하고 있어요
              </_Title>
              <_Line />
              <_SubmitBox>
                <Text size={'header1'} color={'realWhite'}>
                  {documentInfo?.isSubmitted
                    ? '최종제출이 완료된 상태입니다'
                    : scheduleStatusCalculater(data?.currentStatus)}
                </Text>
                <div style={{ width: '240px' }}>
                  <Button
                    color={authorityColor}
                    isBig={true}
                    onClick={() => {
                      if (!isOpen()) {
                        window.location.href = `${APPLY_URL}`;
                      }
                    }}
                    disabled={
                      isOpen() ||
                      isAdmin ||
                      !accessToken ||
                      documentInfo?.isSubmitted ||
                      documentInfoLoading
                    }
                  >
                    지원하기
                  </Button>
                </div>
              </_SubmitBox>
            </_Box>
            <_SubmitMobileBox>
              <Text size={'header1'} color={'realWhite'}>
                {documentInfo?.isSubmitted
                  ? '최종제출이 완료된 상태입니다'
                  : scheduleStatusCalculater(data?.currentStatus)}
              </Text>
            </_SubmitMobileBox>

            <Schedule />
            <_MobileButtonBox>
              <Button
                color={authorityColor}
                isBig={true}
                onClick={() => {
                  if (!isOpen()) {
                    window.location.href = `${APPLY_URL}`;
                  }
                }}
                disabled={
                  isOpen() ||
                  isAdmin ||
                  !accessToken ||
                  documentInfo?.isSubmitted
                }
              >
                지원하기
              </Button>
            </_MobileButtonBox>
          </_TopContainer>
        </_TopContainerWrapper>
        <_FaqWrapper>
          <_MainContainer>
            <ApplyandNotice />
            <Faq />
          </_MainContainer>
        </_FaqWrapper>
      </_Wrapper>
    </>
  );
};

export default Main2;

const _Wrapper = styled.div``;

const _TopContainerWrapper = styled.div`
  background-image: url(${MainBgImg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 64px 0;
`;

const _TopContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  > div:nth-of-type(1) {
    width: 94%;
    max-width: 1180px;
    gap: 70px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
  @media (max-width: 699px) {
    padding-top: 24px;
    justify-content: start;
  }
`;

const _Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: white;
  @media screen and (max-width: 900px) {
    font-size: 40px;
  }
  @media screen and (max-width: 760px) {
    font-size: 36px;
  }
`;

const _Line = styled.div`
  width: 30%;
  height: 1px;
  background-color: white;
`;

const _Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;

  @media (max-width: 699px) {
    display: none !important;
  }
`;

const _SubmitBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const _FaqWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 120px 32px;
  justify-content: center;
  @media (max-width: 699px) {
    display: none;
  }
`;

const _MainContainer = styled.div`
  display: flex;
  gap: 120px;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
`;

const _SubmitMobileBox = styled.div`
  width: 100%;
  display: none;
  padding: 24px;
  @media (max-width: 699px) {
    display: flex;
  }
`;

const _MobileButtonBox = styled.div`
  position: fixed;
  display: none;
  bottom: 0px;
  width: 100vw;
  padding: 24px;
  @media (max-width: 699px) {
    display: flex;
    button {
      width: 100%;
    }
  }
`;
