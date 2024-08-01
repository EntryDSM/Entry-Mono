import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Cookies } from 'react-cookie';
import { PostUserEntry } from '@/apis/user';
import ApplicationTitle from '@/components/Application/ApplicationTitle';
import UserType from '@/components/Application/UserType';
import UserInfo from '@/components/Application/UserInfo';
import UserWrite from '@/components/Application/UserWrite';
import UserPreview from '@/components/Application/UserPreview';
import GradeProgram from '@/components/Grade/GradeProgram';
import UserMiddleSchool from '@/components/Application/UserMiddleShool';
import Modal from '@/components/Modal/Modal';
import DefaultModal from '@/components/Modal/DefaultModal';
import { useModal } from '@/hooks/useModal';

const titles = [
  '지원자 전형 구분',
  '지원자 인적사항',
  '중학교 정보입력',
  '자기소개서 & 학업 계획서',
  '',
  '',
  '',
  '',
  '',
  '지원 원서 미리보기',
];

const Application = () => {
  const [current, setCurrent] = useState<number>(0);
  const { close, modalState, setModalState } = useModal();
  const { mutate } = PostUserEntry();
  const cookie = new Cookies();
  const refresh_token = cookie.get('refreshToken');
  useEffect(() => setModalState('ADMISSION'), []);

  const elements = [
    <UserType current={current} setCurrent={setCurrent} />,
    <UserInfo current={current} setCurrent={setCurrent} />,
    <UserMiddleSchool current={current} setCurrent={setCurrent} />,
    <UserWrite current={current} setCurrent={setCurrent} />,
    <GradeProgram current={current} setCurrent={setCurrent} />,
    <GradeProgram current={current} setCurrent={setCurrent} />,
    <GradeProgram current={current} setCurrent={setCurrent} />,
    <GradeProgram current={current} setCurrent={setCurrent} />,
    <GradeProgram current={current} setCurrent={setCurrent} />,
    <UserPreview current={current} setCurrent={setCurrent} />,
  ];

  return (
    <_Container>
      <_Wrapper>
        {titles[current] && <ApplicationTitle title={titles[current]} />}
        {elements[current]}
      </_Wrapper>
      {modalState === 'ADMISSION' && !!refresh_token && (
        <Modal onClose={() => {}}>
          <DefaultModal
            color="black900"
            title="대덕SW마이스터고등학교"
            subTitle={'입학 원서 접수를 시작하시겠습니까?'}
            button="원서 접수 시작"
            onClick={() => {
              mutate();
              close();
            }}
          />
        </Modal>
      )}
    </_Container>
  );
};

export default Application;

const _Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  margin-top: 5rem;
`;
