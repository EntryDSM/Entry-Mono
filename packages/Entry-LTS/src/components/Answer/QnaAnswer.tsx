import { useAuthority } from '@/hooks/useAuthority';
import { Mobile, Pc } from '@/hooks/useResponsive';
import styled from '@emotion/styled';
import { Text } from '@entrydsm/design-system';
import React from 'react';

interface PropsType {
  title?: string;
  content?: string;
  created_at?: string;
}

const QnaAnswer = ({ title, content, created_at }: PropsType) => {
  const { authorityColor } = useAuthority();

  return (
    <_Reply>
      <Pc>
        <div>
          <_Title>
            <Text color={`${authorityColor}500`} size="header2">
              A.
            </Text>
            <Text color="black900" size="title1">
              {title}
            </Text>
          </_Title>
          <Text color="black600" size="body2">
            {content}
          </Text>
        </div>
        <Text color="black400" size="body1">
          {created_at?.slice(0, 10)}
        </Text>
      </Pc>
      <Mobile>
        <div>
          <_Title>
            <Text color={`${authorityColor}500`} size="title1">
              A.
            </Text>
            <Text color="black900" size="title2">
              {title}
            </Text>
          </_Title>
          <Text color="black600" size="body5">
            {content}
          </Text>
        </div>
        <Text color="black400" size="body3">
          {created_at?.slice(0, 10)}
        </Text>
      </Mobile>
    </_Reply>
  );
};

export default QnaAnswer;

const _Reply = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const _Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;
