import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { Text } from '@entrydsm/design-system';
import { useInput } from '@/hooks/useInput';
import { subject } from '@/constant/grade';
import AllSelect from '@/components/Grade/SelectGrade/AllSelect';
import GradePreview from '@/components/Grade/GradePreview';
import ProgressBar from '@/components/Grade/ProgressBar';
import {
  GradeStatusType,
  ISelectGradeElement,
  IWriteGradeElement,
} from '@/interfaces/grade';
import SelectGrade from '@/components/Grade/SelectGrade/SelectGrade';
import WriteAttendence from '@/components/Grade/WriteInfo/WriteAttendence';
import GradeFooter from '@/components/Grade/GradeFooter';
import {
  getAttendenceScore,
  getBonusScore,
  getMaxScore,
  getSelectGradeScore,
  getVoluntterScore,
  getQualificationExamScore,
} from '@/utils/gradeCalculater';
import { MAIN_URL } from '@/constant/env';

const GradeProgramPage = () => {
  const [current, setCurrent] = useState(0);
  const {
    form: blackexam,
    onChange: changeBlackexam,
    setForm: setBlackexam,
  } = useInput({ score: 0 });
  const [searchParams] = useSearchParams();
  const gradeStatus = searchParams.get('gradeStatus');
  const [score, setScore] = useState({
    gradeScore: 0,
    attendenceScore: 0,
    volunteerScore: 0,
    maxScore: 0,
    certificateScore: 0,
    dsmAlgorithmScore: 0,
    qualificationExamScore: 0,
  });

  const handleBlackexamSubmit = () => {};

  const { form: selectGradeElement, setForm: setSelectGradeElement } =
    useInput<ISelectGradeElement>({
      korean_grade: ['X', 'X', 'X', 'X'],
      social_grade: ['X', 'X', 'X', 'X'],
      history_grade: ['X', 'X', 'X', 'X'],
      math_grade: ['X', 'X', 'X', 'X'],
      science_grade: ['X', 'X', 'X', 'X'],
      english_grade: ['X', 'X', 'X', 'X'],
      tech_and_home_grade: ['X', 'X', 'X', 'X'],
    });

  const {
    form: writeGradeElement,
    onChange: changeWriteGradeElement,
    setForm: setWriteGradeElement,
  } = useInput<IWriteGradeElement>({
    day_absence_count: 0,
    lecture_absence_count: 0,
    lateness_count: 0,
    early_leave_count: 0,
    volunteer_time: 0,
    dsm_algorithm_award: 0,
    certificate: 0,

    korean_grade: 0,
    english_grade: 0,
    math_grade: 0,
    social_grade: 0,
    science_grade: 0,
    optional_grade: 0,
  });

  const handleSubmit = () => {};

  const isGraduate = gradeStatus === 'graduate';
  const titles =
    gradeStatus === 'graduate'
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
          { step: 5, title: '출석 점수 & 봉사 점수', subTitle: '' },
        ]
      : gradeStatus === 'prospectiveGraduate'
        ? [
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
            { step: 4, title: '출석 점수 & 봉사 점수', subTitle: '' },
          ]
        : [
            { step: 1, title: '검정고시 점수', subTitle: '' },
            { step: 2, title: '자격증 및 수상', subTitle: '' },
          ];

  useEffect(() => {
    if (gradeStatus === 'prospectiveGraduate') setCurrent(0);
    else if (gradeStatus === 'graduate') setCurrent(0);
    else if (gradeStatus === 'qualificationExam') setCurrent(0);
    else window.location.replace(`${MAIN_URL}/grade`);
  }, [gradeStatus]);

  useEffect(() => {
    const { dsmAlgorithmScore, certificateScore } =
      getBonusScore(writeGradeElement);
    const newScore =
      gradeStatus === 'qualificationExam'
        ? {
            gradeScore: Math.min(
              140,
              Math.max(
                0,
                Math.round(((blackexam.score - 50) / 50) * 80 * 10) / 10,
              ),
            ),
            attendenceScore: 15,
            volunteerScore: Math.min(
              15,
              Math.max(
                0,
                Math.round(((blackexam.score - 40) / 60) * 15 * 10) / 10,
              ),
            ),
            maxScore: getMaxScore(),
            certificateScore: certificateScore,
            dsmAlgorithmScore: dsmAlgorithmScore,
            qualificationExamScore:
              getQualificationExamScore(writeGradeElement),
          }
        : {
            gradeScore: getSelectGradeScore(
              current,
              selectGradeElement,
              isGraduate,
            ),
            attendenceScore:
              current === titles.length - 1
                ? getAttendenceScore(writeGradeElement)
                : 0,
            volunteerScore: getVoluntterScore(writeGradeElement.volunteer_time),
            maxScore: getMaxScore(),
            certificateScore: certificateScore,
            dsmAlgorithmScore: dsmAlgorithmScore,
            qualificationExamScore:
              getQualificationExamScore(writeGradeElement),
          };
    setScore(newScore);
  }, [current, writeGradeElement, blackexam, gradeStatus, selectGradeElement]);

  return (
    <Container>
      <Wrapper>
        <DIV>
          <Header>
            <Title>
              <Text color="black900" size="header1">
                {titles[current].title}
              </Text>
              <Text color="black500" size="body3">
                {titles[current].subTitle && titles[current].subTitle}
              </Text>
            </Title>
            {gradeStatus !== 'qualificationExam' && (
              <GradeWrapper>
                <GradePreview
                  gradeScore={score.gradeScore}
                  attendenceScore={score.attendenceScore}
                  volunteerScore={score.volunteerScore}
                  maxScore={score.maxScore}
                  certificateScore={score.certificateScore}
                  dsmAlgorithmScore={score.dsmAlgorithmScore}
                />
                {current < titles.length - 1 && (
                  <AllSelect
                    selectGradeElement={selectGradeElement}
                    setSelectGradeElement={setSelectGradeElement}
                    current={current}
                  />
                )}
              </GradeWrapper>
            )}
          </Header>
          <ProgressBar
            step={titles[current].step}
            gradeStatus={gradeStatus as GradeStatusType}
          />
          <_Selects>
            {current < titles.length - 1 && (
              <>
                {gradeStatus === 'qualificationExam' ? (
                  <WriteAttendence
                    qualificationExamPage={current < titles.length - 1}
                    gradeStatus={gradeStatus as GradeStatusType}
                    blackexam={blackexam.score}
                    changeBlackexam={changeBlackexam}
                    writeGradeElement={writeGradeElement}
                    changeWriteGradeElement={changeWriteGradeElement}
                    setWriteGradeElement={setWriteGradeElement}
                  />
                ) : (
                  Object.entries(subject).map((item) => {
                    return (
                      <SelectGrade
                        key={item[0]}
                        title={item[0]}
                        gradesKey={item[1] as keyof ISelectGradeElement}
                        selectGradeElement={selectGradeElement}
                        setSelectGradeElement={setSelectGradeElement}
                        current={current}
                      />
                    );
                  })
                )}
              </>
            )}

            {current === titles.length - 1 && (
              <WriteAttendence
                gradeStatus={gradeStatus as GradeStatusType}
                blackexam={blackexam.score}
                changeBlackexam={changeBlackexam}
                writeGradeElement={writeGradeElement}
                changeWriteGradeElement={changeWriteGradeElement}
                setWriteGradeElement={setWriteGradeElement}
              />
            )}
          </_Selects>
        </DIV>
        <GradeFooter
          gradeStatus={gradeStatus as GradeStatusType}
          current={current}
          setCurrent={setCurrent}
          maxScore={score.volunteerScore + score.attendenceScore}
          gradeScore={score.gradeScore}
          onClick={() =>
            gradeStatus === 'qualificationExam'
              ? handleBlackexamSubmit()
              : handleSubmit()
          }
          onSubmit={() =>
            gradeStatus === 'qualificationExam'
              ? handleBlackexamSubmit()
              : handleSubmit()
          }
          length={titles.length - 1}
          certificateScore={score.certificateScore}
          dsmAlgorithmScore={score.dsmAlgorithmScore}
          qualificationExamScore={score.qualificationExamScore}
        />
      </Wrapper>
    </Container>
  );
};
export default GradeProgramPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 64rem;
  margin-top: 5rem;
`;

const DIV = styled.div`
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
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 20px;
`;

const _Selects = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;
