import styled from '@emotion/styled';
import Youtube from '../../assets/Youtube.svg';
import Notification from '../../assets/Notification.svg';
import Download2 from '../../assets/Download2.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import New from '../../assets/New.svg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllNotice } from '@/utils/api/notice';
import { INotice, NoticeType } from '@/utils/api/notice/types';

const schoolInfoSession = [
  { title: '1차 입학설명회', date: '2024.05.11', url: '' },
  {
    title: '2차 입학설명회',
    date: '2024.07.13',
    url: 'https://www.youtube.com/watch?v=frqGg4d7fXk',
  },
  {
    title: '3차 입학설명회',
    date: '2024.08.24',
    url: 'https://www.youtube.com/watch?v=th-ZWFYhsVg',
  },
  { title: '4차 입학설명회', date: '2024.09.28', url: '' },
];

const BriefingSessionLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSdCH6JcgX9vpDQAnvwEjkEdAtOTwJ4w7KlXIke3wl5uP8vARA/viewform';

const ApplyandNotice = () => {
  const { data }: { data: any } = GetAllNotice('NOTICE');

  const [nowDate, setNowDate] = useState(new Date());
  const [currentLoca, setCurrentLoca] = useState(0);
  const [latestNoticeIndex, setLatestNoticeIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let latestIndex: number = 0;
    const today = new Date();
    for (let i = 0; i < schoolInfoSession.length; i++) {
      const noticeDate = new Date(schoolInfoSession[i].date);
      if (noticeDate < today) {
        latestIndex = i;
      } else {
      }
    }
    setLatestNoticeIndex(latestIndex);
  }, [nowDate]);

  const DownLoad = () => {
    const pdfUrl =
      'https://dsmhs.djsch.kr/boardCnts/fileDown.do?fileSeq=7cc282c62941f5b4e314530b378dc812';
    window.open(pdfUrl);
  };

  interface PropsType {
    sessionName?: string;
    current?: any;
    date?: string;
    even?: boolean;
  }

  const SessionBox = ({ sessionName, current, date }: PropsType) => {
    return (
      <_DateBox
        style={{
          backgroundColor: `${latestNoticeIndex + 1 == current ? '#FFF2EA' : '#f8f8f8'}`,
        }}
      >
        <_TextBox>
          <_SessionName>{sessionName}</_SessionName>
          <_Date
            style={{
              color: `${latestNoticeIndex + 1 == current ? '#FF9154' : '#969696'}`,
            }}
          >
            {date}
          </_Date>
        </_TextBox>
        {latestNoticeIndex + 1 == current ? (
          <_ApplyButton
            onClick={() => {
              window.open(BriefingSessionLink);
            }}
          >
            신청하기
          </_ApplyButton>
        ) : latestNoticeIndex + 1 > current ? (
          <>
            {schoolInfoSession[current].url &&
              schoolInfoSession[current].url !== '' && (
                <_VideoButton
                  onClick={() => {
                    if (schoolInfoSession[current].url)
                      window.open(schoolInfoSession[current].url);
                  }}
                >
                  <_Img src={Youtube} />
                </_VideoButton>
              )}
          </>
        ) : (
          <></>
        )}
      </_DateBox>
    );
  };
  const NoticeBox = ({
    title,
    createdAt,
    id,
  }: Omit<INotice, 'type' | 'isPinned'>) => {
    return (
      <_Notice
        onClick={() => {
          navigate(`/notice/${id}`);
        }}
      >
        <_NoticeTextBox>
          <_TitleBox>
            {title}
            {/* <_Img src={New} /> */}
          </_TitleBox>
          <_NoticeDate>{createdAt.split('T')[0]}</_NoticeDate>
        </_NoticeTextBox>
        <_Img2 src={ArrowRight} />
      </_Notice>
    );
  };
  return (
    <_Wrapper>
      <_ApplyContainer>
        <_Title>
          {latestNoticeIndex === null || latestNoticeIndex >= 3
            ? '원서 접수 시연 영상'
            : '입학설명회 참석 예약'}
        </_Title>
        {latestNoticeIndex === null || latestNoticeIndex >= 3 ? (
          <YoutubeIframe
            width="448"
            height="252"
            src="https://www.youtube.com/embed/d70Snj2wTmY?si=1_TsnwVfsuOlRm3P"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <_ApplyBox>
            <_LineBox>
              <_Line />
              <_Point
                opacity={latestNoticeIndex === null || latestNoticeIndex >= 3}
                style={{
                  top:
                    latestNoticeIndex !== null && latestNoticeIndex < 3
                      ? 48 + (latestNoticeIndex + 1) * 104
                      : 48,
                }}
              />
            </_LineBox>
            <_DateContainer>
              {schoolInfoSession.map(({ title, date }, j) => (
                <SessionBox
                  key={j}
                  date={date}
                  sessionName={title}
                  current={j}
                  even={true}
                />
              ))}
            </_DateContainer>
          </_ApplyBox>
        )}
      </_ApplyContainer>
      <_NoticeContainer>
        <_Title2>
          입학 공지사항
          <Link to="/notice">
            <_PageMoveButton>이동하기</_PageMoveButton>
          </Link>
        </_Title2>
        <_NoticeBox>
          <_MainNoticeBox onClick={DownLoad}>
            <_MainNotificationIcon>
              <_Img src={Notification} />
            </_MainNotificationIcon>
            <_MainNotificationText>
              신입생 전형 요강 PDF 파일 다운로드
            </_MainNotificationText>
            <_Img src={Download2} />
          </_MainNoticeBox>
          {data?.notices?.length > 0 &&
            data?.notices.map(
              (
                notice: { title: string; createdAt: string; id: string },
                index: number,
              ) => {
                if (index >= 4) return;

                return (
                  <NoticeBox
                    title={notice.title}
                    createdAt={notice.createdAt}
                    id={notice.id}
                    key={index}
                  />
                );
              },
            )}
        </_NoticeBox>
      </_NoticeContainer>
    </_Wrapper>
  );
};

export default ApplyandNotice;

const _LineBox = styled.div`
  justify-content: center;
  display: flex;
  padding: 0 24px;
  height: 100%;
  position: relative;
`;

const _Point = styled.div<{ opacity: boolean }>`
  position: absolute;
  background-color: #ffa26e;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  outline: 6px solid #ffcdb1;
  opacity: ${({ opacity }) => (opacity ? 0 : 100)}%;
`;

const _TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const _NoticeDate = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #b0b0b0;
`;

const _NoticeTextBox = styled.div`
  width: 100%;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const _MainNotificationIcon = styled.div`
  border-radius: 100%;
  display: flex;
  padding: 5px;
  background-color: #ffdcc8;
`;

const _MainNotificationText = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
`;

const _MainNoticeBox = styled.div`
  padding: 8px 16px;
  gap: 16px;
  align-items: center;
  display: flex;
  border-radius: 8px;
  background-color: #fff2ea;
  cursor: pointer;
`;

const _Wrapper = styled.div`
  display: flex;
  gap: 120px 32px;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const _ApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  max-width: 80%;
`;

const _NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  min-width: 400px;
`;

const _NoticeBox = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`;

const _Title = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const _Title2 = styled.div`
  font-size: 32px;
  font-weight: 600;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: end;
`;

const _PageMoveButton = styled.button`
  border-radius: 8px;
  padding: 8px 16px;
  background-color: #fff2ea;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #ff7326;
  cursor: pointer;
  &:hover {
    background-color: #ffdfcc;
  }
`;

const _ApplyBox = styled.div`
  display: flex;
  gap: 8px;
`;

const _Line = styled.div`
  width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    #f8f8f8 -26.61%,
    #e7e6eb 50.19%,
    #f8f8f8 130.12%
  );
`;

const _DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const _DateBox = styled.div`
  display: flex;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  gap: 16px;
`;

const _TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const _VideoButton = styled.button`
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
  background-color: #fff1e8;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    background-color: #ffdfcc;
  }
`;

const _ApplyButton = styled.button`
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #ff7e36;
  font-size: 14px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: #ff6c1a;
  }
`;

const _SessionName = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const _Date = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const _Img = styled.img``;

const _Img2 = styled.img`
  transition: transform 0.3s ease-in-out;
`;

const _Notice = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  padding: 20px;
  align-items: center;
  border-radius: 8px;
  border: 2px solid #f8f8f8;
  cursor: pointer;
  &:hover {
    & > *:last-child {
      transform: translateX(8px);
    }
  }
`;

const YoutubeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  overflow: hidden;
  aspect-ratio: 16/9;
`;
