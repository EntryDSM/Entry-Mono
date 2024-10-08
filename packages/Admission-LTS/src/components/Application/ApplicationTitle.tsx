import styled from '@emotion/styled';
import { Text } from '@entrydsm/design-system';

interface IApplicationTitleProps {
  title: string;
}

const ApplicationTitle = ({ title }: IApplicationTitleProps) => {
  return (
    <Wrapper>
      <Text size="title2" color="black600">
        대덕소프트웨어마이스터고등학교
      </Text>
      <Text size="header1" color="black900">
        {title}
      </Text>
    </Wrapper>
  );
};

export default ApplicationTitle;

const Wrapper = styled.div`
  width: 60rem;
`;
