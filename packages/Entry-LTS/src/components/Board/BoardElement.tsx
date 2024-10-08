import { useState } from 'react';
import styled from '@emotion/styled';
import { IBoard } from '@/interfaces/Board';
import { Button, Icon, Stack, Text, theme } from '@entrydsm/design-system';
import { Mobile, Pc, isMobile } from '../../hooks/useResponsive';
import { keyframes } from '@emotion/react';
import { useAuthority } from '@/hooks/useAuthority';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { faqTypeToKorean } from '@/utils/translate';
import { DeleteFaq } from '@/utils/api/faq';
import Pin from '@/assets/pin';
import Megaphone from '@/assets/Megaphone';

const BoardElement = (props: IBoard) => {
  const {
    index,
    isNumber,
    isComment,
    isWriteDay,
    isWriter,
    isPublic,
    isOpen = false,
    boardId,
    boardNumber,
    title,
    content,
    isReplied,
    userName,
    faq_type,
    createdAt,
    isPinned,
    setOpen,
  } = props;
  const { isAdmin, authorityColor } = useAuthority();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: deleteFaq } = DeleteFaq(boardId ?? '');

  return (
    <>
      <_ElementContainer
        onClick={() => {
          setOpen(index);
        }}
        isPinned={isPinned}
      >
        <Div
          style={{
            maxWidth: 700,
            // width: isMobile() && searchParams.get('type') != 'faq' ? '70%' : '0%',
            width: '100%',
          }}
        >
          <Pc>
            <Text
              style={{ whiteSpace: 'nowrap' }}
              align="center"
              color="black700"
              size="body1"
              width={100}
            >
              {isNumber ? boardNumber : faqTypeToKorean[faq_type]}
            </Text>
            <Div style={{ marginLeft: 20 }}>
              {!isPublic && (
                <Icon
                  color={`${authorityColor}500`}
                  size={18}
                  margin={[0, 5, 0, 0]}
                  icon="LockKey"
                />
              )}
              <Text
                color="black800"
                size="body3"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                style={{
                  overflow:
                    searchParams.get('type') != 'faq' ? 'hidden' : 'visible',
                }}
                width={500}
                display="flex"
              >
                {isPinned && (
                  <Div style={{ marginRight: '5px' }}>
                    <Megaphone size={18} color={theme.color.orange500} />
                  </Div>
                )}
                {title}
              </Text>
            </Div>
          </Pc>
          <Mobile>
            {!isNumber && (
              <Text
                color="black700"
                size="body3"
                margin={['right', 20]}
                whiteSpace="nowrap"
              >
                {faqTypeToKorean[faq_type]}
              </Text>
            )}
            <Text
              color="black800"
              size="body5"
              textOverflow="ellipsis"
              whiteSpace="pre-line"
              style={{
                overflow:
                  searchParams.get('type') != 'faq' ? 'hidden' : 'visible',
              }}
            >
              {title}
            </Text>
          </Mobile>
        </Div>
        <Div style={{ justifyContent: 'end' }}>
          {isComment && (
            <>
              <Pc>
                {isReplied ? (
                  <Text
                    align="center"
                    color={`${authorityColor}500`}
                    size="body5"
                    width={100}
                  >
                    완료
                  </Text>
                ) : (
                  <Text
                    align="center"
                    color="black500"
                    size="body5"
                    width={100}
                  >
                    대기중
                  </Text>
                )}
              </Pc>
              <Mobile>
                {isReplied ? (
                  <Text
                    align="center"
                    color={`${authorityColor}500`}
                    size="body5"
                    width={90}
                  >
                    완료
                  </Text>
                ) : (
                  <Text align="center" color="black500" size="body5" width={90}>
                    대기중
                  </Text>
                )}
              </Mobile>
            </>
          )}
          {isWriter && (
            <Pc>
              <Text align="center" color="black500" size="body5" width={100}>
                {userName}
              </Text>
            </Pc>
          )}
          {isWriteDay && (
            <>
              <Pc>
                <Text align="center" color="black500" size="body5" width={100}>
                  {createdAt?.slice(0, 10)}
                </Text>
              </Pc>
              <Mobile>
                <Text align="center" color="black500" size="body5" width={95}>
                  {createdAt?.slice(0, 10)}
                </Text>
              </Mobile>
            </>
          )}
        </Div>
      </_ElementContainer>
      {isOpen && (
        <>
          <Pc>
            <_AnswerPart style={{ height: '14rem' }}>
              <Text align="center" color="black800" size="body3" width={100}>
                답변
              </Text>
              <_Answer>
                <Text color="black600" size="body4">
                  {content}
                </Text>
              </_Answer>
              {isAdmin && (
                <_EditAnswerButtons>
                  <Button
                    color="delete"
                    kind="delete"
                    onClick={() => {
                      deleteFaq();
                    }}
                  >
                    삭제
                  </Button>
                  <Button
                    onClick={() => navigate(`/customer/writeFAQ/${boardId}`)}
                  >
                    수정
                  </Button>
                </_EditAnswerButtons>
              )}
            </_AnswerPart>
          </Pc>
          <Mobile>
            <_AnswerPart style={{ height: '10rem' }}>
              <Text align="center" color="black800" size="body5" width={100}>
                답변
              </Text>
              <_Answer>
                <Text color="black600" size="body5">
                  {content}
                </Text>
                {/* <Text color="black400" size="body3">
                  {createdAt?.slice(0, 10)}
                </Text> */}
              </_Answer>
              {isAdmin && (
                <_EditAnswerButtons>
                  <Button
                    color="delete"
                    kind="delete"
                    onClick={() => console.log('삭제')}
                  >
                    삭제
                  </Button>
                  <Button onClick={() => console.log('삭제')}>수정</Button>
                </_EditAnswerButtons>
              )}
            </_AnswerPart>
          </Mobile>
        </>
      )}
    </>
  );
};

export default BoardElement;

interface Container {
  isPinned: boolean;
}
const _ElementContainer = styled.div<Container>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  border-bottom: 1px solid ${theme.color.black100};
  cursor: pointer;
  background-color: ${(props) => (props.isPinned ? '#FBFBFB' : 'transparent')};
  @media screen and (max-width: 769px) {
    padding: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const fallingAnswer = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 100%;
  }
`;

const _AnswerPart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${theme.color.black50};
  /* animation: ${fallingAnswer} 2s; */
  overflow: hidden;
`;

const _Answer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: start;
  height: 14rem;
  margin-left: 20px;
  padding: 20px 0px;
  @media screen and (max-width: 769px) {
    height: 10rem;
  }
`;

const _EditAnswerButtons = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: flex;
  gap: 10px;
`;
