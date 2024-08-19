import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from '@entrydsm/design-system';
import { GetUserType } from '@/apis/application';
import { ISelectGradeElement, IWriteGradeElement } from '@/apis/score/type';
import {
  getAttendenceScore,
  getExtraScore,
  getMaxScore,
  getSelectGradeScore,
  getVoluntterScore,
} from '@/utils/gradeCalculater';

export interface IGradePreview {
  gradeCurrent: number;
  selectGradeElement: ISelectGradeElement;
  writeGradeElement: IWriteGradeElement;
}

const GradePreview = ({
  gradeCurrent,
  selectGradeElement,
  writeGradeElement,
}: IGradePreview) => {
  const [score, setScore] = useState({
    gradeScore: 0,
    attendenceScore: 0,
    volunteerScore: 0,
    maxScore: 0,
    extraScore: 0,
  });
  const { data: getUserType } = GetUserType();
  const isCommon = getUserType?.applicationType === 'COMMON';
  const isGraduate = getUserType?.educationalStatus === 'GRADUATE';

  useEffect(() => {
    setScore({
      gradeScore: getSelectGradeScore(
        gradeCurrent,
        isCommon,
        selectGradeElement,
        isGraduate,
      ),
      attendenceScore:
        isGraduate && gradeCurrent === 4
          ? getAttendenceScore(writeGradeElement)
          : !isGraduate && gradeCurrent === 3
            ? getAttendenceScore(writeGradeElement)
            : 0,
      volunteerScore: getVoluntterScore(writeGradeElement.volunteerTime),
      maxScore: getMaxScore(isCommon),
      extraScore: getExtraScore(writeGradeElement.extraScore),
    });
  }, [gradeCurrent, writeGradeElement]);

  return (
    <CurrentGrades>
      <Text size="body2" color="realBlack" style={{ fontWeight: 700 }}>
        총:{' '}
        {score.gradeScore +
          score.attendenceScore +
          score.volunteerScore +
          score.extraScore}
        /{score.maxScore}
      </Text>
      <Text size="body2" color="realBlack" style={{ fontWeight: 500 }}>
        성적 점수: {score.gradeScore}/{score.maxScore - 30}
      </Text>
      <Text size="body2" color="realBlack" style={{ fontWeight: 500 }}>
        출석 점수: {score.attendenceScore}/15
      </Text>
      <Text size="body2" color="realBlack" style={{ fontWeight: 500 }}>
        봉사 점수: {score.volunteerScore}/15
      </Text>
      <Text size="body2" color="realBlack" style={{ fontWeight: 500 }}>
        가산점 : +{score.extraScore}
      </Text>
    </CurrentGrades>
  );
};

export default GradePreview;

const CurrentGrades = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;
