import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Text, theme } from '@entrydsm/design-system';

interface ApplicationContentProps {
  grid: number;
  width?: number;
  required?: boolean;
  title: string;
  placeholder?: string;
  bottomPlaceholder?: string;
  children: ReactNode;
}

const ApplicationContent = ({
  grid,
  width,
  required = true,
  title,
  placeholder,
  bottomPlaceholder,
  children,
}: ApplicationContentProps) => {
  return (
    <_ApplicationContent width={width}>
      <_ApplicationGridbox grid={grid}>
        <_ApplicationTitle
          color={required ? 'black900' : 'black600'}
          size="body2"
        >
          {title}
          {required && <_RequiredStar> *</_RequiredStar>}
        </_ApplicationTitle>
        {children}
      </_ApplicationGridbox>
      <div>
        {placeholder && (
          <Text color="black600" size="body6">
            {placeholder}
          </Text>
        )}
        {bottomPlaceholder && (
          <Text color="black600" size="body6" margin={['top', 5]}>
            {bottomPlaceholder}
          </Text>
        )}
      </div>
    </_ApplicationContent>
  );
};

export default ApplicationContent;

const _ApplicationContent = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  min-height: 85px;
  padding: 0px 32px 0px 16px;
  border-bottom: 1px solid ${theme.color.black100};
  &:last-child {
    border-bottom: none;
  }
`;

const _ApplicationGridbox = styled.div<{ grid: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${({ grid }) => grid + 1}, minmax(170px, auto));
`;

const _ApplicationTitle = styled(Text)`
  justify-self: center;
  margin-right: 20px;
`;

const _RequiredStar = styled.sup`
  color: ${theme.color.error};
`;
