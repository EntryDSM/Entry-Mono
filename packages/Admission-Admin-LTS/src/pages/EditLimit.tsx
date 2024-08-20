import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, Stack, Text, theme, Toast } from '@entrydsm/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { editApplicationCount, getApplicationCount, getStaticCounts } from '@/utils/api/admin';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';

function EditLimit() {
  const { mutateAsync } = editApplicationCount();

  const { setForm, form, onChange } = useInput({
    commonDaejeon: '',
    meisterDajeon: '',
    socialDaejeon: '',
    commonNationWide: '',
    meisterNationWide: '',
    socialNationWide: '',
  });

  const { data } = getApplicationCount();

  useEffect(() => {
    data?.map((res) => {
      switch (res.application_type) {
        case 'COMMON':
          return res.is_daejeon
            ? setForm((prev) => ({ ...prev, commonDaejeon: String(res.count) }))
            : setForm((prev) => ({ ...prev, commonNationWide: String(res.count) }));
        case 'MEISTER':
          return res.is_daejeon
            ? setForm((prev) => ({ ...prev, meisterDajeon: String(res.count) }))
            : setForm((prev) => ({ ...prev, meisterNationWide: String(res.count) }));
        case 'SOCIAL':
          return res.is_daejeon
            ? setForm((prev) => ({ ...prev, socialDaejeon: String(res.count) }))
            : setForm((prev) => ({ ...prev, socialNationWide: String(res.count) }));
      }
    });
  }, [data]);

  const queryClient = useQueryClient();
  const { combinedMutations } = useCombineMutation();

  const saveLimit = () => {
    combinedMutations(
      [
        () => mutateAsync({ application_type: 'COMMON', is_daejeon: true, count: +form.commonDaejeon }),
        () => mutateAsync({ application_type: 'COMMON', is_daejeon: false, count: +form.commonNationWide }),
        () => mutateAsync({ application_type: 'MEISTER', is_daejeon: true, count: +form.meisterDajeon }),
        () => mutateAsync({ application_type: 'MEISTER', is_daejeon: false, count: +form.meisterNationWide }),
        () => mutateAsync({ application_type: 'SOCIAL', is_daejeon: true, count: +form.socialDaejeon }),
        () => mutateAsync({ application_type: 'SOCIAL', is_daejeon: false, count: +form.socialNationWide }),
      ],
      () => {
        queryClient.invalidateQueries(['applicationCount']);
        Toast('수정이 완료되었습니다.', { type: 'success' });
      },
    );
  };

  return (
    <_Wrapper>
      <Text size="header1" color="black900">
        정원 수정
      </Text>
      <_THead>
        <Text color="black900" size="title1" width={200}>
          일반 전형
        </Text>
        <Text color="black900" size="title1" width={200}>
          마이스터 전형
        </Text>
        <Text color="black900" size="title1" width={200}>
          사회통합 전형
        </Text>
      </_THead>
      <_TBody>
        <_Text color="black900" size="title1">
          대전
        </_Text>
        <_Inputs>
          <Input
            name="commonDaejeon"
            onChange={onChange}
            type="number"
            placeholder="일반 전형(대전)"
            unit="명"
            value={form.commonDaejeon}
            width={200}
          />
          <Input
            name="meisterDajeon"
            onChange={onChange}
            type="number"
            placeholder="마이스터 전형(대전)"
            unit="명"
            value={form.meisterDajeon}
            width={200}
          />
          <Input
            name="socialDaejeon"
            onChange={onChange}
            type="number"
            placeholder="서류통합 전형(대전)"
            unit="명"
            value={form.socialDaejeon}
            width={200}
          />
        </_Inputs>
      </_TBody>
      <_TBody>
        <_Text color="black900" size="title1">
          전국
        </_Text>
        <_Inputs>
          <Input
            name="commonNationWide"
            onChange={onChange}
            type="number"
            placeholder="일반 전형(전국)"
            unit="명"
            value={form.commonNationWide}
            width={200}
          />
          <Input
            name="meisterNationWide"
            onChange={onChange}
            type="number"
            placeholder="마이스터 전형(전국)"
            unit="명"
            value={form.meisterNationWide}
            width={200}
          />
          <Input
            name="socialNationWide"
            onChange={onChange}
            type="number"
            placeholder="서류통합 전형(전국)"
            unit="명"
            value={form.socialNationWide}
            width={200}
          />
        </_Inputs>
      </_TBody>
      <_TBody>
        <_Text color="black900" size="title1">
          총
        </_Text>
        <_Inputs>
          <Text color="black900" size="title1" width={200}>
            {`${+form.commonDaejeon + +form.commonNationWide}명`}
          </Text>
          <Text color="black900" size="title1" width={200}>
            {`${+form.meisterDajeon + +form.meisterNationWide}명`}
          </Text>
          <Text color="black900" size="title1" width={200}>
            {`${+form.socialDaejeon + +form.socialNationWide}명`}
          </Text>
        </_Inputs>
        <_Total color="black900" size="title1" width={200}>
          {`${
            +form.commonDaejeon +
            +form.commonNationWide +
            +form.meisterDajeon +
            +form.meisterNationWide +
            +form.socialDaejeon +
            +form.socialNationWide
          }명`}
        </_Total>
      </_TBody>
      <Stack margin={['top', 20]} gap={10}>
        <Button color="green" onClick={saveLimit}>
          저장
        </Button>
        <Link to="/">
          <Button kind="outlined" color="green" onClick={() => {}}>
            취소
          </Button>
        </Link>
      </Stack>
    </_Wrapper>
  );
}

export default EditLimit;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 75rem;
  width: 100%;
  margin: 7rem auto 0;
  padding: 0 20px 200px 20px;
`;

const _THead = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 60px;
  height: 80px;
  border-bottom: 1px solid ${theme.color.black100};
`;

const _TBody = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${theme.color.black100};
`;

const _Inputs = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const _Text = styled(Text)`
  position: absolute;
  top: 25px;
  left: 20px;
`;

const _Total = styled(Text)`
  position: absolute;
  right: 0;
`;
