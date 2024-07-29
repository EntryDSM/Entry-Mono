import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface IAuthLinks {
  isAdmin: boolean;
}

export const AuthLinks = ({ isAdmin }: IAuthLinks) => {
  return (
    <_Links>
      {!isAdmin && (
        <>
          <Link to="/sign-up" id="sign-up">
            회원가입
          </Link>
          <hr />
        </>
      )}
      <Link to="/change-pwd">비밀번호 찾기</Link>
      <hr />
      <Link to={isAdmin ? '/login' : '/admin-login'}>
        {isAdmin ? '유저 로그인' : '관리자 로그인'}
      </Link>
    </_Links>
  );
};

export const _Links = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;

  hr {
    width: 1px;
    height: 20px;
    background-color: black;
    margin: 0 20px;
  }
`;
