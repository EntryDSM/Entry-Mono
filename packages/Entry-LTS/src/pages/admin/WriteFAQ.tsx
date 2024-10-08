import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, Radio, Stack, Text, TextAreaProps, Textarea } from '@entrydsm/design-system';
import { Mobile, Pc } from '@/hooks/useResponsive';
import { useInput } from '@/hooks/useInput';
import { useTextArea } from '@/hooks/useTextArea';
import { CreateFaq, GetFaqDetail, UpdateFaq } from '@/utils/api/faq';
import { ICreateFaq } from '@/utils/api/faq/types';
import { useAuthority } from '@/hooks/useAuthority';
import { useParams } from 'react-router-dom';

const WriteFAQPage = () => {
  const {
    form: inputValue,
    onChange: setInputValue,
    setForm: setInputForm,
  } = useInput<Omit<ICreateFaq, 'content'>>({
    title: '',
    faqType: 'ADMISSION',
  });
  const { form: textAreaValue, onChange: setTextAreaValue, setForm: setTextAreaForm } = useTextArea({ content: '' });
  const { id } = useParams();
  const { mutate: createFaq } = CreateFaq();
  const { mutate: updateFaq } = UpdateFaq(id);
  const { data: faqDetail } = GetFaqDetail(id);
  const { authorityColor } = useAuthority();

  useEffect(() => {
    if (!faqDetail) return;

    setInputForm({
      title: faqDetail.title,
      faqType: faqDetail.faqType,
    });

    setTextAreaForm({
      content: faqDetail.content,
    });
  }, [faqDetail]);

  const onClick = () => {
    if (id) {
      updateFaq({ ...inputValue, ...textAreaValue });
    } else {
      createFaq({ ...inputValue, ...textAreaValue });
    }
  };

  return (
    <_Container>
      <_Wrapper>
        <></>
        <Pc>
          <Text color="black900" size="header1">
            FAQ 작성
          </Text>
        </Pc>
        <Mobile>
          <Text color="black900" size="title1">
            FAQ 작성
          </Text>
        </Mobile>
        <_Line />
        <Text color="black900" size="body5" margin={[0, 0, 6, 5]}>
          분류
        </Text>
        <Stack gap={60} margin={['bottom', 20]}>
          <Radio
            name="faqType"
            label="입학"
            value="ADMISSION"
            color={authorityColor}
            onClick={setInputValue}
            checked={inputValue.faqType === 'ADMISSION'}
          />
          <Radio
            name="faqType"
            label="진로"
            value="COURSE"
            color={authorityColor}
            onClick={setInputValue}
            checked={inputValue.faqType === 'COURSE'}
          />
          <Radio
            name="faqType"
            label="학교생활"
            value="SCHOOL_LIFE"
            color={authorityColor}
            onClick={setInputValue}
            checked={inputValue.faqType === 'SCHOOL_LIFE'}
          />
          <Radio
            name="faqType"
            label="기숙사"
            value="DORMITORY"
            color={authorityColor}
            onClick={setInputValue}
            checked={inputValue.faqType === 'DORMITORY'}
          />
          <Radio
            name="faqType"
            label="기타"
            value="OTHER"
            color={authorityColor}
            onClick={setInputValue}
            checked={inputValue.faqType === 'OTHER'}
          />
        </Stack>
        <Input
          name="title"
          type="text"
          label="질문"
          width="100%"
          placeholder="질문을 입력해주세요"
          value={inputValue.title}
          onChange={setInputValue}
        />
        <Textarea
          name="content"
          label="답변"
          width="100%"
          placeholder="답변을 입력해주세요"
          maxLength={600}
          value={textAreaValue.content}
          onChange={setTextAreaValue}
          margin={['top', 20]}
        />
        <_ButtonBox>
          <Button color="green" onClick={onClick}>
            {id ? '수정' : '게시'}
          </Button>
        </_ButtonBox>
      </_Wrapper>
    </_Container>
  );
};

export default WriteFAQPage;

const _Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const _Wrapper = styled.div`
  margin-top: 85px;
  width: 60rem;
  height: 38rem;
  padding: 0 20px;
`;

const _Line = styled.div`
  margin: 20px 0px;
  width: 70px;
  height: 1.5px;
  background-color: #cacaca;
  @media screen and (max-width: 769px) {
    margin-top: 15px;
  }
`;

const _ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  @media screen and (max-width: 769px) {
    margin-top: 25px;
  }
`;
