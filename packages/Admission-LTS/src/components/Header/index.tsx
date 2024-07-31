import * as _ from './style';
import { Text } from '@entrydsm/design-system';
import LogoOrange from '@/assets/LogoOrange.svg';
import { MAIN_URL } from '@/constant/env';

const Header = () => {
  return (
    <_._HeaderContainer>
      <div style={{ minWidth: '60rem' }}>
        <_._LogoButton
          onClick={() => {
            window.location.href = `${MAIN_URL}`;
          }}
        >
          <img
            src={LogoOrange}
            alt=""
            style={{
              width: '35px',
              height: '48px',
              marginRight: 12,
              cursor: 'pointer',
            }}
          />
          <Text color="realBlack" size="header1">
            EntryDSM
          </Text>
        </_._LogoButton>
      </div>
    </_._HeaderContainer>
  );
};

export default Header;
