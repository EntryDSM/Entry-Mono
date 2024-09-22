import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import styled from '@emotion/styled';
import {
  Button,
  Input,
  Stack,
  Text,
  theme,
  Skeleton,
} from '@entrydsm/design-system';
import { instance } from '@/apis/axios';
import {
  EditAdditionalInfo,
  GetAdditionalInfo,
  GetUserType,
} from '@/apis/application';
import ApplicationContent from './ApplicationContent';
import ApplicationFooter from './ApplicationFooter';
import Modal from '../Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import {
  ICurrnettype,
  ISearchSchool,
  ISearchSchools,
  IUserMiddleSchool,
  InputType,
} from '@/interface/type';

const UserMiddleSchool = ({ current, setCurrent }: ICurrnettype) => {
  const { form: userMiddleSchool, setForm: setUserMiddleSchool } =
    useInput<IUserMiddleSchool>({
      studentNumber: ['', '', ''],
      schoolCode: '',
      teacherName: '',
      teacherTel: '',
    });
  const { form: schoolName, setForm: setSchoolName } = useInput('');

  /** 중학교 겁색을 위한 form */
  const { form, setForm } = useInput('');
  const [schoolList, setSchoolList] = useState<ISearchSchool[]>([]);
  const [timer, setTimer] = useState(0); // 디바운싱 타이머
  const { setModalState, modalState, close } = useModal();
  const { combinedMutations } = useCombineMutation();

  const { data: isBlackExam } = GetUserType();
  const { data, isLoading } = GetAdditionalInfo();
  const { mutateAsync } = EditAdditionalInfo();

  useEffect(() => {
    isBlackExam?.educationalStatus === 'QUALIFICATION_EXAM' &&
      setCurrent((current) => current + 1);
  }, [isBlackExam]);

  useEffect(() => {
    if (!!data) {
      setUserMiddleSchool({
        studentNumber: [
          data.studentNumber
            ? data.studentNumber.gradeNumber
            : userMiddleSchool.studentNumber[0],
          data.studentNumber
            ? data.studentNumber.classNumber
            : userMiddleSchool.studentNumber[1],
          data.studentNumber
            ? data.studentNumber.studentNumber
            : userMiddleSchool.studentNumber[2],
        ],
        schoolCode: data.schoolCode
          ? data.schoolCode
          : userMiddleSchool.schoolCode,
        teacherName: data.teacherName,
        teacherTel: data.teacherTel,
      });
      setSchoolName(data.schoolName);
    }
  }, [data]);

  const searchSchool = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const response: AxiosResponse = await instance.get<ISearchSchools>(
        `schools?school_name=${form}`,
      );
      const data = response.data;
      setSchoolList(data?.content);
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = Number(
      setTimeout(async () => {
        const response: AxiosResponse = await instance.get<ISearchSchools>(
          `schools?school_name=${form}`,
        );
        const data = response.data;
        setSchoolList(data?.content);
      }, 1500),
    );
    setTimer(newTimer);
  }, [form]);

  const confirmSchool = (schoolCode: string, schoolName: string) => {
    setUserMiddleSchool({ ...userMiddleSchool, schoolCode });
    setSchoolName(schoolName);
    close();
  };

  const onChangeStudentNumber = (
    e: InputType,
    index: number,
    maxLength: number,
  ) => {
    const oldArray = userMiddleSchool.studentNumber;
    if (e.currentTarget.value.length >= maxLength) {
      oldArray[index] = e.currentTarget.value.slice(0, maxLength);
    } else {
      oldArray[index] = e.currentTarget.value;
    }
    setUserMiddleSchool((prev) => ({ ...prev, studentNumber: oldArray }));
  };

  const onChangeTeacherName = (e: InputType) => {
    const old = e.currentTarget.value;
    setUserMiddleSchool((prev) => ({ ...prev, teacherName: old }));
  };

  const onChangeTeacherTel = (e: InputType) => {
    const old = e.currentTarget.value;
    setUserMiddleSchool((prev) => ({ ...prev, teacherTel: old }));
  };

  useEffect(() => {
    console.log(userMiddleSchool.teacherTel);
    console.log(!!userMiddleSchool.studentNumber.join('') === false);
  }, [userMiddleSchool]);

  const isDisabled =
    Object.values(userMiddleSchool).some((item) => !!item === false) ||
    userMiddleSchool.studentNumber.some((item) => !!item === false);

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            ...userMiddleSchool,
            gradeNumber: parseInt(userMiddleSchool.studentNumber[0]),
            classNumber: parseInt(userMiddleSchool.studentNumber[1]),
            studentNumber: userMiddleSchool.studentNumber[2],
            teacherTel: userMiddleSchool.teacherTel.replace(/-/g, ''),
          }),
      ],
      () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent grid={2} title="중학교 이름">
          {isLoading ? (
            <Skeleton width={230} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              type="text"
              placeholder="중학교 이름"
              name="name"
              value={schoolName}
              width={230}
              disabled
            />
          )}
          <Stack margin={['left', 20]} width={70}>
            <Button
              color="black"
              kind="outlined"
              onClick={() => setModalState('SEARCH_SCHOOL')}
            >
              검색
            </Button>
          </Stack>
        </ApplicationContent>
        <ApplicationContent grid={1} title="중학교 교사 성명">
          {isLoading ? (
            <Skeleton width={230} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              name="teacherName"
              type="text"
              value={userMiddleSchool.teacherName}
              width={230}
              onChange={onChangeTeacherName}
            />
          )}
        </ApplicationContent>
        <ApplicationContent
          grid={1}
          title="추천 교사 연락처"
          placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요"
        >
          {isLoading ? (
            <Skeleton width={230} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              name="teacherTel"
              type="tel"
              value={userMiddleSchool.teacherTel}
              width={230}
              onChange={onChangeTeacherTel}
              maxLength={13}
            />
          )}
        </ApplicationContent>
        <ApplicationContent
          grid={3}
          title="중학교 학번"
          placeholder="반, 번호는 최대 2자리수 까지 입력 가능합니다."
        >
          {isLoading ? (
            <Skeleton width={120} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              type="number"
              value={userMiddleSchool.studentNumber[0]}
              onChange={(e) => {
                if (Number(e.target.value) <= 3) {
                  onChangeStudentNumber(e, 0, 1);
                }
              }}
              placeholder="학년"
              width={120}
              unit="학년"
              maxLength={1}
            />
          )}
          {isLoading ? (
            <Skeleton width={120} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              type="number"
              value={userMiddleSchool.studentNumber[1]}
              onChange={(e) => onChangeStudentNumber(e, 1, 2)}
              placeholder="반"
              width={120}
              unit="반"
              maxLength={2}
            />
          )}
          {isLoading ? (
            <Skeleton width={120} height={42} isLoaded={isLoading} />
          ) : (
            <Input
              type="number"
              value={userMiddleSchool.studentNumber[2]}
              onChange={(e) => onChangeStudentNumber(e, 2, 2)}
              placeholder="번호"
              width={120}
              unit="번호"
              maxLength={2}
            />
          )}
        </ApplicationContent>

        {modalState === 'SEARCH_SCHOOL' && (
          <Modal onClose={close}>
            <Input
              type="text"
              placeholder="중학교를 검색하세요"
              width={430}
              icon="Magnifier"
              onKeyDown={searchSchool}
              onChange={(e) => {
                setForm(e.target.value);
              }}
              value={form}
            />
            <_SearchPreviews>
              {schoolList?.map((school) => {
                return (
                  <_SearchPreview
                    onClick={() => confirmSchool(school.code, school.name)}
                  >
                    <Text color="black900" size="body3">
                      {school.name}
                    </Text>
                    <Text color="black600" size="body6">
                      {school.address.split(' ')[0] +
                        ' ' +
                        school.address.split(' ')[1]}
                    </Text>
                  </_SearchPreview>
                );
              })}
            </_SearchPreviews>
          </Modal>
        )}
      </_ApplicationWrapper>
      <ApplicationFooter
        current={current}
        isDisabled={isDisabled}
        prevClick={() => setCurrent(current - 1)}
        nextClick={onNextClick}
      />
    </>
  );
};

export default UserMiddleSchool;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;

const _SearchPreviews = styled.div`
  width: 430px;
  height: 200px;
  align-items: center;
  margin-top: 25px;
  overflow-x: hidden;
`;

const _SearchPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 430px;
  height: 45px;
  border: 1px solid ${theme.color.black300};
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: ${theme.color.black100};
  }
`;
