import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Text, Spinner } from '@entrydsm/design-system';
import { GetUserType } from '@/apis/application';
import {
  EditUserBlackExam,
  EditUserGraduation,
  GetUserBlackExam,
  GetUserGraduation,
} from '@/apis/score';
import {
  IBlackExamGradeElement,
  ISelectGradeElement,
  IWriteGradeElement,
} from '@/apis/score/type';
import ProgressBar from './ProgressBar';
import GradePreview from './GradePreview';
import AllSelect from './SelectGrade/AllSelect';
import SelectGrade from './SelectGrade/SelectGrade';
import ApplicationFooter from '../Application/ApplicationFooter';
import WriteAttendence from './WriteInfo/WriteAttendence';
import { subject } from '@/constant/grade';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { ICurrnettype } from '@/interface/type';
import WriteBlackExam from './WriteInfo/WriteBlackExam';

const Program = ({ current, setCurrent }: ICurrnettype) => {
  const { form: selectGradeElement, setForm: setSelectGradeElement } =
    useInput<ISelectGradeElement>({
      koreanGrade: ['X', 'X', 'X', 'X'],
      socialGrade: ['X', 'X', 'X', 'X'],
      historyGrade: ['X', 'X', 'X', 'X'],
      mathGrade: ['X', 'X', 'X', 'X'],
      scienceGrade: ['X', 'X', 'X', 'X'],
      englishGrade: ['X', 'X', 'X', 'X'],
      techAndHomeGrade: ['X', 'X', 'X', 'X'],
    });

  const {
    form: writeGradeElement,
    setForm: setWriteGradeElement,
    onChange: changeWriteGradeElement,
  } = useInput<IWriteGradeElement>({
    absenceDayCount: 0,
    lectureAbsenceCount: 0,
    latenessCount: 0,
    earlyLeaveCount: 0,
    volunteerTime: 0,
    extraScore: {
      hasCertificate: false,
      hasCompetitionPrize: false,
    },
  });

  const {
    form: blackExamGradeElement,
    setForm: setBlackExamGradeElement,
    onChange: changeBlackExamGradeElement,
  } = useInput<IBlackExamGradeElement>({
    koreanGrade: 0,
    socialGrade: 0,
    englishGrade: 0,
    mathGrade: 0,
    scienceGrade: 0,
    electivesGrade: 0,
  });

  const { data: userType } = GetUserType();
  const { data: userGraduation, isLoading } = GetUserGraduation();
  const { combinedMutations } = useCombineMutation();
  const { mutateAsync } = EditUserGraduation();
  const isBlackExam = userType?.educationalStatus === 'QUALIFICATION_EXAM';
  const { data: userBlackExam } = GetUserBlackExam(isBlackExam);
  const { mutateAsync: editBlackExam } = EditUserBlackExam();

  const isGraduate = userType?.educationalStatus === 'GRADUATE';
  const isCommon = userType?.applicationType === 'COMMON';
  const gradeCurrent = current - 4;
  const titles = isGraduate
    ? [
        {
          step: 1,
          title: '3학년 2학기',
          subTitle: '과목이 없는 경우 X로 기입하세요',
        },
        {
          step: 2,
          title: '3학년 1학기',
          subTitle: '과목이 없는 경우 X로 기입하세요',
        },
        {
          step: 3,
          title: '2학년 2학기(직전학기)',
          subTitle: '과목이 없는 경우 X로 기입하세요',
        },
        {
          step: 4,
          title: '2학년 1학기(직전 전학기)',
          subTitle: '과목이 없는 경우 X로 기입하세요',
        },
        { step: 5, title: '출석 점수 & 봉사 점수' },
      ]
    : isBlackExam
      ? [
          { step: 1, title: '검정고시 점수 입력' },
          { step: 2, title: '가산점' },
        ]
      : [
          {
            step: 1,
            title: '3학년 1학기',
            subTitle: '과목이 없는 경우 X로 기입하세요',
          },
          {
            step: 2,
            title: '직전 학기',
            subTitle: '과목이 없는 경우 X로 기입하세요',
          },
          {
            step: 3,
            title: '직전전 학기',
            subTitle: '과목이 없는 경우 X로 기입하세요',
          },
          { step: 4, title: '출석 점수 & 봉사 점수' },
        ];

  useEffect(() => {
    if (isBlackExam) {
      userBlackExam &&
        setBlackExamGradeElement({
          koreanGrade: userBlackExam.koreanGrade,
          mathGrade: userBlackExam.mathGrade,
          socialGrade: userBlackExam.socialGrade,
          scienceGrade: userBlackExam.scienceGrade,
          electivesGrade: userBlackExam.electivesGrade,
          englishGrade: userBlackExam.englishGrade,
        });
      userBlackExam &&
        setWriteGradeElement({
          absenceDayCount: 0,
          lectureAbsenceCount: 0,
          latenessCount: 0,
          earlyLeaveCount: 0,
          volunteerTime: 0,
          extraScore: userBlackExam.extraScore,
        });
    } else {
      userGraduation &&
        (setWriteGradeElement({
          absenceDayCount: userGraduation.absenceDayCount,
          lectureAbsenceCount: userGraduation.lectureAbsenceCount,
          latenessCount: userGraduation.latenessCount,
          earlyLeaveCount: userGraduation.earlyLeaveCount,
          volunteerTime: userGraduation.volunteerTime,
          extraScore: {
            hasCertificate: userGraduation.extraScore?.hasCertificate,
            hasCompetitionPrize: userGraduation.extraScore?.hasCompetitionPrize,
          },
        }),
        setSelectGradeElement({
          koreanGrade: isGraduate
            ? userGraduation.koreanGrade.split('')
            : userGraduation.koreanGrade.split('').slice(1),
          socialGrade: isGraduate
            ? userGraduation.koreanGrade.split('')
            : userGraduation.socialGrade.split('').slice(1),
          historyGrade: isGraduate
            ? userGraduation.historyGrade.split('')
            : userGraduation.historyGrade.split('').slice(1),
          mathGrade: isGraduate
            ? userGraduation.koreanGrade.split('')
            : userGraduation.mathGrade.split('').slice(1),
          scienceGrade: isGraduate
            ? userGraduation.scienceGrade.split('')
            : userGraduation.scienceGrade.split('').slice(1),
          englishGrade: isGraduate
            ? userGraduation.englishGrade.split('')
            : userGraduation.englishGrade.split('').slice(1),
          techAndHomeGrade: isGraduate
            ? userGraduation.techAndHomeGrade.split('')
            : userGraduation.techAndHomeGrade.split('').slice(1),
        }));
    }
  }, [userGraduation]);

  const onNextClick = () => {
    combinedMutations(
      [
        () => {
          if (isBlackExam) {
            return editBlackExam({
              koreanGrade: blackExamGradeElement.koreanGrade,
              englishGrade: blackExamGradeElement.englishGrade,
              mathGrade: blackExamGradeElement.mathGrade,
              socialGrade: blackExamGradeElement.socialGrade,
              scienceGrade: blackExamGradeElement.scienceGrade,
              electivesGrade: blackExamGradeElement.electivesGrade,
              extraScore: {
                hasCertificate: writeGradeElement?.extraScore.hasCertificate,
                hasCompetitionPrize:
                  writeGradeElement?.extraScore.hasCompetitionPrize,
              },
            });
          } else {
            return mutateAsync({
              koreanGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.koreanGrade.join(''),
              socialGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.socialGrade.join(''),
              historyGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.historyGrade.join(''),
              mathGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.mathGrade.join(''),
              scienceGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.scienceGrade.join(''),
              englishGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.englishGrade.join(''),
              techAndHomeGrade:
                (!isGraduate ? 'X' : '') +
                selectGradeElement.techAndHomeGrade.join(''),
              absenceDayCount: Number(writeGradeElement.absenceDayCount),
              lectureAbsenceCount: Number(
                writeGradeElement.lectureAbsenceCount,
              ),
              latenessCount: Number(writeGradeElement.latenessCount),
              earlyLeaveCount: Number(writeGradeElement.earlyLeaveCount),
              volunteerTime: Number(writeGradeElement.volunteerTime),
              extraScore: {
                hasCertificate: writeGradeElement.extraScore.hasCertificate,
                hasCompetitionPrize:
                  writeGradeElement.extraScore.hasCompetitionPrize,
              },
            });
          }
        },
      ],
      () =>
        setCurrent(
          !isGraduate && gradeCurrent === 3
            ? current + 2
            : isBlackExam && gradeCurrent === 0
              ? current + 5
              : current + 1,
        ),
    );
  };

  return (
    <>
      {isLoading && (
        <_Background>
          <Spinner color="orange" />
        </_Background>
      )}
      <_Wrapper>
        <Header>
          <Title>
            <Text color="black900" size="header1">
              {titles[gradeCurrent].title}
            </Text>
            <Text color="black500" size="body3">
              {titles[gradeCurrent].subTitle && titles[gradeCurrent].subTitle}
            </Text>
          </Title>
          <GradeWrapper>
            {!isBlackExam && (
              <GradePreview
                gradeCurrent={gradeCurrent}
                selectGradeElement={selectGradeElement}
                writeGradeElement={writeGradeElement}
              />
            )}
            {!isBlackExam && !isGraduate && gradeCurrent < 3 && (
              <AllSelect
                selectGradeElement={selectGradeElement}
                setSelectGradeElement={setSelectGradeElement}
                current={gradeCurrent}
              />
            )}
            {!isBlackExam && isGraduate && gradeCurrent < 4 && (
              <AllSelect
                selectGradeElement={selectGradeElement}
                setSelectGradeElement={setSelectGradeElement}
                current={gradeCurrent}
              />
            )}
          </GradeWrapper>
        </Header>
        <ProgressBar step={titles[gradeCurrent].step} />
        <_Selects>
          {!isGraduate &&
            !isBlackExam &&
            gradeCurrent < 3 &&
            Object.entries(subject).map((item) => {
              return (
                <SelectGrade
                  key={item[0]}
                  title={item[0]}
                  gradesKey={item[1] as keyof ISelectGradeElement}
                  selectGradeElement={selectGradeElement}
                  setSelectGradeElement={setSelectGradeElement}
                  current={gradeCurrent}
                />
              );
            })}
          {!isGraduate && !isBlackExam && titles[gradeCurrent].step === 4 && (
            <WriteAttendence
              writeGradeElement={writeGradeElement}
              changeWriteGradeElement={changeWriteGradeElement}
              setWriteGradeElement={setWriteGradeElement}
              isCommon={isCommon}
              educationalStatus={userType?.educationalStatus}
            />
          )}
          {isGraduate &&
            gradeCurrent < 4 &&
            Object.entries(subject).map((item) => {
              return (
                <SelectGrade
                  key={item[0]}
                  title={item[0]}
                  gradesKey={item[1] as keyof ISelectGradeElement}
                  selectGradeElement={selectGradeElement}
                  setSelectGradeElement={setSelectGradeElement}
                  current={gradeCurrent}
                />
              );
            })}
          {isGraduate && titles[gradeCurrent].step === 5 && (
            <WriteAttendence
              writeGradeElement={writeGradeElement}
              changeWriteGradeElement={changeWriteGradeElement}
              setWriteGradeElement={setWriteGradeElement}
              isCommon={isCommon}
              educationalStatus={userType.educationalStatus}
            />
          )}
          {isBlackExam && titles[gradeCurrent].step === 1 && (
            <WriteBlackExam
              writeGradeElement={blackExamGradeElement}
              changeWriteGradeElement={changeBlackExamGradeElement}
              setWriteGradeElement={setBlackExamGradeElement}
              isCommon={isCommon}
              educationalStatus={userType.educationalStatus}
            />
          )}
          {isBlackExam && titles[gradeCurrent].step === 2 && (
            <WriteAttendence
              writeGradeElement={writeGradeElement}
              changeWriteGradeElement={changeWriteGradeElement}
              setWriteGradeElement={setWriteGradeElement}
              isCommon={isCommon}
              educationalStatus={userType.educationalStatus}
            />
          )}
        </_Selects>
      </_Wrapper>
      <ApplicationFooter
        current={current}
        isDisabled={false}
        prevClick={() => setCurrent(current - 1)}
        nextClick={onNextClick}
      />
    </>
  );
};

export default Program;

const _Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GradeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const _Selects = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;

const _Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 101;
`;
