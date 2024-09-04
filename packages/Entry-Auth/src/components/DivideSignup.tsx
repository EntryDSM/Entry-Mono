import React, { useState } from 'react';
import styled from '@emotion/styled';
import DivideSignupCard from './DivideSignupCard';
import { Button, HStack, Stack, Text } from '@team-entry/design_system';
import { GoToAuthorization } from './GoToAuthorization';
import { useModal } from '@/hooks/useModal';

interface IDivideSignup {
  setIsStudent: React.Dispatch<React.SetStateAction<boolean>>;
}

const DivideSignup = ({ setIsStudent }: IDivideSignup) => {
  const [isClick, setIsClick] = useState(false);
  const { render, close } = useModal();

  if (isClick)
    return <GoToAuthorization text="본인 인증후 회원가입을 진행해 주세요" />;
  return (
    <>
      <Wrapper>
        <DivideSignupCard setIsStudent={setIsStudent} setIsClick={setIsClick} />
      </Wrapper>
      <Stack justify="center" gap={12} margin={[0, 'auto']}>
        <Text color="black600" size="body1">
          학생 명의로 가입할 수 없나요?
        </Text>
        <Text
          onClick={() =>
            render({
              title: '안내',
              content:
                '학부모 명의로 가입 시 원서 접수 서류에 \n 학부모 연락처가 입력됩니다.',
              button: (
                <HStack gap={10}>
                  <_SelectButton
                    kind="contained"
                    color="orange"
                    onClick={() => {
                      close();
                      setIsClick(true);
                      setIsStudent(false);
                    }}
                  >
                    진행
                  </_SelectButton>
                  <_SelectButton
                    kind="outlined"
                    color="black"
                    onClick={() => {
                      close();
                    }}
                  >
                    닫기
                  </_SelectButton>
                </HStack>
              ),
            })
          }
          color="orange500"
          size="body1"
          style={{ textDecoration: 'underline' }}
          cursor="pointer"
        >
          학부모 명의로 가입
        </Text>
      </Stack>
    </>
  );
};

export default DivideSignup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 32px;
`;

const _SelectButton = styled(Button)`
  width: 120px;
`;
