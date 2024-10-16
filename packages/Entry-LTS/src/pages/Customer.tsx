import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';
import { Mobile, Pc } from '@/hooks/useResponsive';
import BoardHeader from '@/components/Board/BoardHeader';
import BoardElement from '@/components/Board/BoardElement';
import BoardTitle from '@/components/Board/BoardTitle';
import { GetAllQna } from '@/utils/api/qna';
import { AuthorityColorType, useAuthority } from '@/hooks/useAuthority';
import { GetAllFaq } from '@/utils/api/faq';
import PageNation from '@/components/PageNation';
import { FaqType } from '@/utils/api/faq/types';
import { PageLoading } from '@/components/PageLoading';

const CustomerPage = () => {
  const [category, setCategory] = useState<FaqType>('');
  const categories: Record<string, FaqType> = {
    '전체': '',
    '입학 문의': 'ADMISSION',
    '진로': 'COURSE',
    '학교 생활': 'SCHOOL_LIFE',
    '기숙사': 'DORMITORY',
    '기타': 'OTHER',
  };

  const { isAdmin, authorityColor } = useAuthority();

  // const { data: getAllQna, isLoading: qnaLoading } = GetAllQna();

  const { data: faqData, isLoading: faqLoading } = GetAllFaq(category);

  const [searchParams, setSearchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState<number>(-1);

  const setType = (current: boolean) => {
    current ? searchParams.set('type', 'faq') : searchParams.set('type', 'qna');
    setCurrent(0);

    setSearchParams(searchParams);
  };

  const setOpen = (index: number) => {
    if (index === isOpen) {
      setIsOpen(-1);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <_Container>
      <PageLoading isVisible={faqLoading} />
      <_Wrapper>
        <BoardTitle
          // click={searchParams.get('type') === 'faq'}
          // setClick={setType}
          title="자주 묻는 질문"
          subTitle="입학 상담 문의: 042-866-8811, 8822, 8814"
          // button1="Q&A"
          // button2="자주 묻는 질문"
          // button3="FAQ 작성"
          isCustomer
          link={isAdmin ? 'writeFAQ' : 'write'}
        />
        <Text margin={[-16, 0, 30, 0]} color={'realBlack'} size={'body1'}>
          답변 내용은 2025학년도 신입생 전형에 적용되는 내용입니다
        </Text>
        {searchParams.get('type') === 'faq' ? (
          <>
            <BoardHeader
              isNumber
              isTopBorder={false}
              isComment
              isWriteDay
              isWriter
            />
            {/* {getAllQna?.questions?.slice(0 + current * 10, current * 10 + 10).map((qna, idx) => {
              return (
                <Link to={`/customer/${qna.id}`} key={qna.id}>
                  <BoardElement
                    title={qna.title}
                    boardNumber={getAllQna.questions.length - (idx + current * 10)}
                    createdAt={qna.created_at}
                    userName={qna.username}
                    isPublic={qna.is_public}
                    isReplied={qna.is_replied}
                    isNumber={true}
                    isTopBorder={false}
                    isComment={true}
                    isWriteDay={true}
                    isWriter={true}
                  />
                </Link>
              );
            })} */}
          </>
        ) : (
          <>
            <_Categories>
              {Object.entries(categories).map((res, i) => {
                return (
                  <>
                    <Pc>
                      <Text
                        color={
                          res[1] === category
                            ? `${authorityColor}500`
                            : `${authorityColor}100`
                        }
                        size="title2"
                        cursor="pointer"
                        onClick={() => {
                          setCategory(res[1]);
                          setOpen(-1);
                          setCurrent(0);
                        }}
                      >
                        {res[0]}
                      </Text>
                    </Pc>
                    <Mobile>
                      <Text
                        color={
                          res[1] === category
                            ? `${authorityColor}500`
                            : `${authorityColor}100`
                        }
                        size="body3"
                        cursor="pointer"
                        onClick={() => {
                          setCategory(res[1]);
                          setCurrent(0);
                        }}
                      >
                        {res[0]}
                      </Text>
                    </Mobile>
                    {res[0] !== '기타' && (
                      <_Circle authorityColor={authorityColor} />
                    )}
                  </>
                );
              })}
            </_Categories>
            <BoardHeader isNumber={false} isTopBorder={true} />
            {faqData?.faqs.length > 0 &&
              faqData.faqs
                .slice(0 + current * 10, current * 10 + 10)
                .map((faq, index) => (
                  <BoardElement
                    index={index}
                    key={index}
                    content={faq.content}
                    createdAt={faq.createdAt}
                    title={faq.title}
                    faq_type={faq.faqType}
                    isNumber={false}
                    isTopBorder={true}
                    isOpen={isOpen === index}
                    isPublic
                    boardId={faq.id}
                    setOpen={setOpen}
                  />
                ))}
          </>
        )}
        {
          // (searchParams.get('type') == 'qna' && getAllQna?.questions?.length !== 0) ||
          searchParams.get('type') != 'faq' && faqData?.faqs.length !== 0 && (
            <PageNation
              pageNum={Math.floor(
                Math.ceil(faqData?.faqs.length / 10) || 0,
                // searchParams.get('type') == 'faq'
                //   ? Math.ceil(faqData?.faqs.length / 10) || 0
                //   : Math.ceil(getAllQna?.questions?.length / 10) || 0,
              )}
              current={current}
              setCurrent={setCurrent}
              setOpen={setOpen}
            />
          )
        }
      </_Wrapper>
    </_Container>
  );
};

export default CustomerPage;

const _Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 80px;
`;

const _Wrapper = styled.div`
  margin-top: 7rem;
  width: 100%;
  max-width: 60rem;
  padding: 0 20px;
`;

const _Categories = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  max-width: 60rem;
  width: 100%;
  @media screen and (max-width: 769px) {
    gap: 5px;
  }
`;

const _Circle = styled.div<{ authorityColor: AuthorityColorType }>`
  width: 4px;
  height: 4px;
  background-color: ${({ authorityColor }) =>
    theme.color[`${authorityColor}100`]};
  border-radius: 50px;
`;
