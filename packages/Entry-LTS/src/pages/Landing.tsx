import First from '@/components/landing/FirstContainer';
import Second from '@/components/landing/SecondContainer';
import Third from '@/components/landing/ThirdContainer';
import Fourth from '@/components/landing/FourthContainer';
import Fifth from '@/components/landing/FifthContainer';
import Sixth from '@/components/landing/SixthContainer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 700) {
      navigate('/main');
    }
  }, []);

  return (
    <>
      {/* 가장 상단에 있는 콘테이너 */}
      <First />
      {/* 우리학교 프로젝트 설명해주는 콘테이너 */}
      <Second />
      {/* 그래프랑 입상 이미지 있는 콘테이너 */}
      <Third />
      {/* MOU 기업 돌아가는 콘테이너 */}
      <Fourth />
      {/* 엔트리 블로그로 이동되는 콘테이너 */}
      <Fifth />
      {/* 가장 하단에 있는 콘테이너 */}
      <Sixth />
    </>
  );
};

export default Landing;
