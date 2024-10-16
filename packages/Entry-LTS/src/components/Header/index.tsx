import * as _ from './style';
import LogoOrange from '../../assets/LogoOrange.svg';
import LogoGreen from '../../assets/LogoGreen.svg';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Icon, Text } from '@entrydsm/design-system';
import { Mobile, Pc } from '../../hooks/useResponsive';
import Menu from '@/assets/Menu.svg';
import { useAuthority } from '@/hooks/useAuthority';
import { getCookies, removeCookies, removeTokens } from '@/utils/cookies';
import { ADMIN_URL, AUTH_URL, COOKIE_DOMAIN } from '@/constant/env';
import { getUserInfo } from '@/utils/api/application';
import { getSchedule } from '@/utils/api/schedule';

type THeader =
  | '문의사항'
  | '공지사항'
  | '성적산출'
  | '신입생 전형 요강'
  | '로그인'
  | '마이페이지'
  | '로그아웃'
  | '원서접수'
  | 'About'
  | '전형요강'
  | '자주묻는질문'
  | '';

interface IHeaderList {
  name: THeader;
  url: string;
  type?: 'login' | 'logout' | 'total';
}

const headerList: IHeaderList[] = [
  { name: '전형요강', url: '/admission' },
  { name: '공지사항', url: '/notice' },
  { name: '자주묻는질문', url: '/customer' },
  { name: '성적산출', url: '/grade' },
];

const menuList: IHeaderList[] = [
  { name: '전형요강', url: '/admission' },
  { name: '공지사항', url: '/notice' },
  { name: '자주묻는질문', url: '/customer' },
  { name: '성적산출', url: '/grade' },
];

const Header = () => {
  const [list, setList] = useState<THeader>('');
  const [visibility, setVisibility] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDropdownHover, setIsDropdownHover] = useState<boolean>(false);
  const [throttle, setThrottle] = useState(false);
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!!getCookies('accessToken'));
  const { isAdmin, authorityColor } = useAuthority();
  const navigate = useNavigate();
  const authority = getCookies('authority');
  const { data } = getUserInfo(isLogin && authority != 'admin');
  const { data: scheduleData } = getSchedule();
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  const isLoginOpen = () => {
    const currentDate = new Date();
    const startDate = new Date(scheduleData?.schedules[0]?.date ?? '');
    const endDate = new Date(scheduleData?.schedules[4]?.date ?? '');

    return !(currentDate >= startDate && currentDate <= endDate);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const onClick = () => {
    window.location.href = `${AUTH_URL}/login`;
  };

  useEffect(() => {
    if (visibility) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  }, [visibility]);

  const closeMenu = () => {
    if (throttle) return;
    else {
      setThrottle(true);
      setTimeout(() => {
        setThrottle(false);
      }, 500);
      setVisibility(!visibility);
    }
  };

  // const Logout = () => {
  //   removeCookies('authority', {
  //     path: '/',
  //     secure: true,
  //     sameSite: 'none',
  //     domain: COOKIE_DOMAIN,
  //   });
  //   removeTokens();
  //   setIsLogin(false);
  //   alert('로그아웃 되었습니다');
  //   navigate('/');
  //   setIsOpen(false);
  // };

  useEffect(() => {
    setIsLogin(!!getCookies('accessToken'));
  }, [getCookies('accessToken')]);

  return (
    <>
      <_._Wrapper
        scroll={
          location.pathname === '/main' || location.pathname === '/'
            ? scrollY
            : 1
        }
        onClick={() => {
          isDropdownOpen && setIsDropdownOpen(false);
        }}
      >
        <_._HeaderContainer scroll={scrollY}>
          <Mobile>
            <_._MenuIcon onClick={closeMenu} src={Menu} alt="" />
            {isOpen && (
              <_._Background onClick={closeMenu}>
                <_._Menu
                  onClick={(e) => e.stopPropagation()}
                  visibility={visibility}
                >
                  {menuList.map((list, idx) => {
                    return (
                      <Link key={idx} to={list.url}>
                        <_._MenuElement
                          color={'black'}
                          onClick={() => {
                            setVisibility(false);
                          }}
                        >
                          {list.name}
                        </_._MenuElement>
                      </Link>
                    );
                  })}
                  {isLogin ? (
                    <>
                      <Link to="/mypage">
                        <_._MenuElement color="black">
                          마이페이지
                        </_._MenuElement>
                      </Link>
                      {/* <_._MenuElement color="red" onClick={Logout}>
                        로그아웃
                      </_._MenuElement> */}
                    </>
                  ) : (
                    <>
                      <_._MenuElement
                        color="black"
                        onClick={onClick}
                        // onClick={!isLoginOpen() && onClick}
                        // disabled={isLoginOpen()}
                      >
                        로그인
                      </_._MenuElement>
                    </>
                  )}
                </_._Menu>
              </_._Background>
            )}
          </Mobile>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.4vw' }}>
            <_._LogoButton onClick={() => setVisibility(false)} to="/main">
              <img
                src={isAdmin ? LogoGreen : LogoOrange}
                alt=""
                style={{
                  width: '35px',
                  height: '48px',
                  marginRight: 12,
                  cursor: 'pointer',
                }}
              />
              {(location.pathname !== '/main' && location.pathname !== '/') ||
              scrollY >= 1 ? (
                <_._Text
                  fontColor="#000"
                  fontSize={18}
                  fontWeight={500}
                  className="logoText"
                >
                  EntryDSM
                </_._Text>
              ) : (
                <_._Text
                  fontColor="fff"
                  fontSize={18}
                  fontWeight={500}
                  className="logoText"
                >
                  EntryDSM
                </_._Text>
              )}
            </_._LogoButton>
            <Pc>
              <_._Texts>
                {headerList.map((res, index) => {
                  const { name, url } = res;
                  return (
                    <Link key={index} to={url}>
                      <Text
                        size="body1"
                        color={
                          location.pathname.includes(url)
                            ? `${authorityColor}500`
                            : 'inherit'
                        }
                      >
                        {name}
                      </Text>
                    </Link>
                  );
                })}
              </_._Texts>
            </Pc>
          </div>
          <Pc>
            {isLogin ? (
              <>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2vw',
                  }}
                >
                  <_._DropdownWrapper
                    onMouseOver={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div>
                      <Text
                        size="body1"
                        color={
                          location.pathname.includes('/about')
                            ? `${authorityColor}500`
                            : 'inherit'
                        }
                      >
                        About
                      </Text>
                      <Icon
                        cursor="pointer"
                        icon="DownArrow"
                        color={
                          (location.pathname !== '/main' &&
                            location.pathname !== '/') ||
                          scrollY >= 1
                            ? 'realBlack'
                            : 'realWhite'
                        }
                        className="downArrow"
                      />
                    </div>
                    {(isDropdownOpen || isDropdownHover) && (
                      <_._DropdownMenus
                        onMouseOver={() => setIsDropdownHover(true)}
                        onMouseLeave={() => setIsDropdownHover(false)}
                      >
                        <Link to="/about">
                          <_._DropdownMenu>
                            <Text
                              size="body1"
                              color="inherit"
                              className="modalText"
                            >
                              팀 소개
                            </Text>
                          </_._DropdownMenu>
                        </Link>
                        <Link to="/">
                          <_._DropdownMenu>
                            <Text
                              size="body1"
                              color="inherit"
                              className="modalText"
                            >
                              학교 소개
                            </Text>
                          </_._DropdownMenu>
                        </Link>
                      </_._DropdownMenus>
                    )}
                  </_._DropdownWrapper>
                  {isAdmin ? (
                    <Link to={ADMIN_URL}>
                      <Button
                        color={authorityColor}
                        kind="contained"
                        onClick={onClick}
                      >
                        입학전형 관리자 페이지로
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/mypage">
                        <Text
                          size="body1"
                          color={
                            location.pathname.includes('/mypage')
                              ? `${authorityColor}500`
                              : 'inherit'
                          }
                        >
                          마이페이지
                        </Text>
                      </Link>
                      <Text
                        size="body1"
                        color="inherit"
                        style={{ fontSize: '22px' }}
                      >
                        {data && data.name}
                      </Text>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2vw',
                  }}
                >
                  <_._DropdownWrapper
                    onMouseOver={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div>
                      <Text
                        size="body1"
                        color={
                          location.pathname.includes('/about')
                            ? `${authorityColor}500`
                            : 'inherit'
                        }
                      >
                        About
                      </Text>
                      <Icon
                        cursor="pointer"
                        icon="DownArrow"
                        color={
                          (location.pathname !== '/main' &&
                            location.pathname !== '/') ||
                          scrollY >= 1
                            ? 'realBlack'
                            : 'realWhite'
                        }
                        className="downArrow"
                      />
                    </div>
                    {(isDropdownOpen || isDropdownHover) && (
                      <_._DropdownMenus
                        onMouseOver={() => setIsDropdownHover(true)}
                        onMouseLeave={() => setIsDropdownHover(false)}
                      >
                        <Link to="/about">
                          <_._DropdownMenu>
                            <Text
                              size="body1"
                              color="inherit"
                              className="modalText"
                            >
                              팀 소개
                            </Text>
                          </_._DropdownMenu>
                        </Link>
                        <Link to="/">
                          <_._DropdownMenu>
                            <Text
                              size="body1"
                              color="inherit"
                              className="modalText"
                            >
                              학교 소개
                            </Text>
                          </_._DropdownMenu>
                        </Link>
                      </_._DropdownMenus>
                    )}
                  </_._DropdownWrapper>
                  <Button
                    color={authorityColor}
                    kind="contained"
                    onClick={onClick}
                    // disabled={isLoginOpen()}
                  >
                    로그인
                  </Button>
                </div>
              </>
            )}
          </Pc>
        </_._HeaderContainer>
      </_._Wrapper>
      <div
        onClick={() => {
          isDropdownOpen && setIsDropdownOpen(false);
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Header;
