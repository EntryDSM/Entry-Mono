import { Button, Icon, IconType, Text, theme } from '@entrydsm/design-system';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { Mobile, Pc } from '@/hooks/useResponsive';
import { AuthorityColorType, useAuthority } from '@/hooks/useAuthority';

interface IGradeListProps {
  icon: IconType;
  title: string;
  text: string;
  type: string;
}

const list: IGradeListProps[] = [
  {
    icon: 'DeleteUser',
    title: '졸업예정자',
    text: '아직 중학교를 졸업하지 않은\n졸업자를 칭합니다',
    type: 'prospectiveGraduate',
  },
  {
    icon: 'ApproveUser',
    title: '졸업자',
    text: '이미 중학교를 졸업한 \n지원자를 칭합니다.',
    type: 'graduate',
  },
  {
    icon: 'Reader',
    title: '검정고시',
    text: '(중학교 졸업학력)',
    type: 'qualificationExam',
  },
];

const GradePage = () => {
  const { authorityColor } = useAuthority();
  const navigate = useNavigate();

  return (
    <_Container>
      <_Wrapper>
        <Text color="black900" size="header1">
          성적 산출 유형 선택
        </Text>
        <_Line authorityColor={authorityColor} />
        <_Cards>
          {list.map((res, index) => {
            const { icon, text, title, type } = res;
            return (
              <_Card key={index} index={index}>
                <_TitleBox>
                  <_IconBackground authorityColor={authorityColor}>
                    <Icon icon={icon} size={46} />
                  </_IconBackground>
                  <_Title>
                    <Text color="black900" size="title2">
                      {title}
                    </Text>
                    <_Text>{text}</_Text>
                  </_Title>
                </_TitleBox>
                <Button
                  onClick={() => {
                    navigate(`/gradeProgram?gradeStatus=${type}`);
                  }}
                  color={authorityColor}
                  kind="rounded"
                >
                  선택
                </Button>
              </_Card>
            );
          })}
        </_Cards>
      </_Wrapper>
    </_Container>
  );
};

export default GradePage;

const _Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  width: 100%;
  margin-top: 10rem;
  transition: all 0.5s ease-in;
`;

const _Line = styled.div<{ authorityColor: AuthorityColorType }>`
  width: 4rem;
  height: 2px;
  background-color: ${({ authorityColor }) =>
    theme.color[`${authorityColor}500`]};
  margin: 2rem;
`;

const _Cards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  padding: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const _Card = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 344px;
  width: 100%;
  height: 440px;
  padding: 24px 20px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  gap: 20px;
  opacity: 0;
  transform: translateY(50px);
  animation: fadeUp 0.4s ease-in-out forwards;
  animation-delay: ${({ index }) => index * 0.2}s;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    height: auto;
    max-width: 800px;
  }
`;

const _IconBackground = styled.div<{ authorityColor: AuthorityColorType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ authorityColor }) =>
    theme.color[`${authorityColor}500`]};
  border: 1px solid ${theme.color.black100};
  min-width: 90px;
  height: 90px;
  border-radius: 50px;
  box-sizing: border-box;
`;

const _TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

const _Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const _Text = styled.p`
  text-align: center;
  color: #5f5f5f;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 768px) {
    text-align: start;
  }
`;
