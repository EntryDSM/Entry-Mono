import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Textarea } from '@entrydsm/design-system';
import { useQueryClient } from '@tanstack/react-query';
import {
  EditUserIntroduce,
  EditUserPlan,
  GetUserIntroduce,
  GetUserStudyPlan,
  GetUserType,
} from '@/apis/application';
import ApplicationFooter from './ApplicationFooter';
import { useTextArea } from '@/hooks/useTextarea';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { ICurrnettype } from '@/interface/type';

const UserWrite = ({ current, setCurrent }: ICurrnettype) => {
  const {
    form: userWrite,
    onChange: changeUserWrite,
    setForm: setUserWrite,
  } = useTextArea({
    userIntroduce: '',
    userPlan: '',
  });

  const queryClient = useQueryClient();
  const { mutateAsync: editUserIntroduce } = EditUserIntroduce();
  const { mutateAsync: editUserPlan } = EditUserPlan();
  const { combinedMutations } = useCombineMutation();
  const { data: getUserIntroduce, isLoading: isIntroduceLoading } =
    GetUserIntroduce();
  const { data: getUserStudyPlan, isLoading: isStudyLoading } =
    GetUserStudyPlan();
  const { data: getUserType } = GetUserType();

  const isBlackExam = getUserType?.educationalStatus == 'QUALIFICATION_EXAM';

  useEffect(() => {
    getUserIntroduce &&
      setUserWrite((prev) => ({
        ...prev,
        userIntroduce: getUserIntroduce.content,
      }));
    getUserStudyPlan &&
      setUserWrite((prev) => ({ ...prev, userPlan: getUserStudyPlan.content }));
  }, [getUserIntroduce, getUserStudyPlan]);

  const nextCurrentGenerator = () => {
    switch (getUserType?.educationalStatus) {
      case 'PROSPECTIVE_GRADUATE':
        setCurrent(current + 1);
        break;
      case 'QUALIFICATION_EXAM':
        queryClient.invalidateQueries(['PdfPreview']);
        setCurrent(current + 1);
        break;
      default:
        setCurrent(current + 1);
    }
  };

  const onNextClick = () => {
    combinedMutations(
      [
        () => editUserIntroduce({ content: userWrite.userIntroduce }),
        () => editUserPlan({ content: userWrite.userPlan }),
      ],
      () => nextCurrentGenerator(),
    );
  };

  return (
    <>
      <_Wrapper>
        {isIntroduceLoading ? (
          <Skeleton width={960} height={300} isLoaded={isIntroduceLoading} />
        ) : (
          <Textarea
            placeholder="내용을 입력해주세요"
            label="자기소개서"
            maxLength={1600}
            width="100%"
            name="userIntroduce"
            value={userWrite.userIntroduce}
            onChange={changeUserWrite}
          />
        )}
        {isStudyLoading ? (
          <Skeleton width={960} height={300} isLoaded={isStudyLoading} />
        ) : (
          <Textarea
            placeholder="내용을 입력해주세요"
            label="학업계획서"
            maxLength={1600}
            width="100%"
            name="userPlan"
            value={userWrite.userPlan}
            onChange={changeUserWrite}
          />
        )}
      </_Wrapper>
      <ApplicationFooter
        current={current}
        isDisabled={!userWrite.userPlan || !userWrite.userIntroduce}
        prevClick={
          isBlackExam
            ? () => setCurrent(current - 2)
            : () => setCurrent(current - 1)
        }
        nextClick={onNextClick}
      />
    </>
  );
};

export default UserWrite;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  width: 60rem;
  margin: 40px 0;
`;
