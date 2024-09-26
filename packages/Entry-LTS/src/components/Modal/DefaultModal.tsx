import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Button, Text, theme, Input } from '@entrydsm/design-system';
import { colorKeyOfType } from '@entrydsm/design-system';
import { useInput } from '../../hooks/useInput';
import { fontKeyOfType } from '@entrydsm/design-system/src/style/font';

interface IDefaultModal {
  color: colorKeyOfType;
  title: string;
  titleSize?: fontKeyOfType;
  subTitle: ReactNode;
  button?: ReactNode;
  onClick?: () => void;
  isInput?: boolean;
  isWarningStyle?: boolean;
}

const DefaultModal = ({
  color,
  title,
  subTitle,
  isInput,
  button,
  onClick,
  titleSize = 'title1',
  isWarningStyle = false,
}: IDefaultModal) => {
  const { form, onChange } = useInput<{ inputString: string }>({
    inputString: '',
  });

  return (
    <>
      <Text size={titleSize} color={color} margin={[60, 0, 20, 0]}>
        {title}
      </Text>
      <_ModalLine />
      <Text size="body2" color="black700" margin={[20, 0, 30, 0]}>
        {subTitle}
      </Text>
      <InputButtonBox>
        {isInput && (
          <Input
            width={260}
            type="text"
            placeholder="확인했습니다"
            onChange={onChange}
            name="inputString"
            value={form.inputString}
          />
        )}
        {button && onClick && (
          <Button
            kind={isWarningStyle ? 'delete' : 'contained'}
            color={isWarningStyle ? 'delete' : 'orange'}
            onClick={onClick}
            disabled={
              form.inputString === '확인했습니다' || !isInput ? false : true
            }
          >
            {button}
          </Button>
        )}
      </InputButtonBox>
    </>
  );
};

export default DefaultModal;

const _ModalLine = styled.div`
  width: 150px;
  height: 1px;
  background-color: ${theme.color.black100};
`;

const InputButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`;
