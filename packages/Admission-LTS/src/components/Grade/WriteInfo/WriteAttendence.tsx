import { Input } from '@entrydsm/design-system';
import GradeWraper from '../GradeWraper';
import { InputType } from '@/interface/type';
import { IWriteGradeElement } from '@/apis/score/type';
import SelectAdditionalPoint from '../SelectGrade/SelectAdditionalPoint';
import { EducationalStatus } from '@/apis/application/types';

interface IWriteGrade {
  writeGradeElement: IWriteGradeElement;
  changeWriteGradeElement: (e: InputType) => void;
  setWriteGradeElement: React.Dispatch<
    React.SetStateAction<IWriteGradeElement>
  >;
  isCommon: boolean;
  educationalStatus?: EducationalStatus;
}

const WriteAttendence = ({
  writeGradeElement,
  changeWriteGradeElement,
  setWriteGradeElement,
  isCommon,
  educationalStatus,
}: IWriteGrade) => {
  console.log(isCommon);
  return (
    <>
      {educationalStatus !== 'QUALIFICATION_EXAM' && (
        <>
          <GradeWraper title="미인정 결석">
            <Input
              type="number"
              width={230}
              name="absenceDayCount"
              placeholder="결석 횟수"
              value={writeGradeElement.absenceDayCount}
              onChange={changeWriteGradeElement}
              unit="일"
            />
          </GradeWraper>
          <GradeWraper title="미인정 지각">
            <Input
              type="number"
              width={230}
              name="latenessCount"
              placeholder="지각 횟수"
              value={writeGradeElement.latenessCount}
              onChange={changeWriteGradeElement}
              unit="회"
            />
          </GradeWraper>
          <GradeWraper title="미인정 조퇴">
            <Input
              type="number"
              width={230}
              name="earlyLeaveCount"
              placeholder="조퇴 횟수"
              value={writeGradeElement.earlyLeaveCount}
              onChange={changeWriteGradeElement}
              unit="회"
            />
          </GradeWraper>
          <GradeWraper title="미인정 결과">
            <Input
              type="number"
              width={230}
              name="lectureAbsenceCount"
              placeholder="결과 횟수"
              value={writeGradeElement.lectureAbsenceCount}
              onChange={changeWriteGradeElement}
              unit="회"
            />
          </GradeWraper>
          <GradeWraper title="봉사활동 시간">
            <Input
              type="number"
              width={230}
              name="volunteerTime"
              placeholder="봉사 시간"
              value={writeGradeElement.volunteerTime}
              onChange={changeWriteGradeElement}
              unit="시간"
            />
          </GradeWraper>
        </>
      )}
      <SelectAdditionalPoint
        title="DSM 알고리즘 대회 입상 여부"
        name="hasCompetitionPrize"
        writeGradeElement={writeGradeElement}
        setWriteGradeElement={setWriteGradeElement}
      />
      {!isCommon && (
        <SelectAdditionalPoint
          title="정보처리기능사 자격증 취득 여부"
          name="hasCertificate"
          writeGradeElement={writeGradeElement}
          setWriteGradeElement={setWriteGradeElement}
        />
      )}
    </>
  );
};

export default WriteAttendence;
