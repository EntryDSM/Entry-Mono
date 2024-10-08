import styled from '@emotion/styled';
import { Text } from '@entrydsm/design-system';
import { IBoard } from '@/interfaces/Board';
import { Mobile, Pc } from '../../hooks/useResponsive';

const BoardHeader = (props: IBoard) => {
  const { isNumber, isTopBorder, isComment, isWriteDay, isWriter } = props;
  return (
    <_HeaderContainer style={{ borderTop: isTopBorder && '1px solid black' }}>
      <Div>
        <>
          <Pc>
            <Text align="center" color="black700" size="body1" width={100}>
              {isNumber ? '번호' : '구분'}
            </Text>
            <Text align="center" color="black700" size="body1" margin={['left', 20]}>
              제목
            </Text>
          </Pc>
          <Mobile>
            {!isNumber && (
              <Text
                color="black700"
                style={{ display: 'flex', justifyContent: 'center' }}
                size="body3"
                width={60}
                margin={['right', 20]}
              >
                구분
              </Text>
            )}
            <Text color="black700" size="body3">
              제목
            </Text>
          </Mobile>
        </>
      </Div>
      <Div>
        {isComment && (
          <>
            <Pc>
              <Text align="center" color="black700" size="body1" width={100}>
                답변
              </Text>
            </Pc>
            <Mobile>
              <Text align="center" color="black700" size="body3" width={90}>
                답변
              </Text>
            </Mobile>
          </>
        )}
        {isWriter && (
          <Pc>
            <Text align="center" color="black700" size="body1" width={100}>
              작성자
            </Text>
          </Pc>
        )}
        {isWriteDay && (
          <>
            <Pc>
              <Text align="center" color="black700" size="body1" width={100}>
                작성일
              </Text>
            </Pc>
            <Mobile>
              <Text align="center" color="black700" size="body3" width={95}>
                작성일
              </Text>
            </Mobile>
          </>
        )}
      </Div>
    </_HeaderContainer>
  );
};

export default BoardHeader;

const _HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  border-bottom: 1px solid black;
  @media screen and (max-width: 769px) {
    padding: 20px;
    height: 2.5rem;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;
