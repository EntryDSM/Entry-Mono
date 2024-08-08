import { Input } from '@entrydsm/design-system';
import GradeWraper from '../GradeWraper';
import { InputType } from '@/interface/type';
import { IBlackExamGradeElement, IWriteGradeElement } from '@/apis/score/type';
import { EducationalStatus } from '@/apis/application/types';

interface IWriteGrade {
  writeGradeElement: IBlackExamGradeElement;
  changeWriteGradeElement: (e: InputType) => void;
  setWriteGradeElement: React.Dispatch<
    React.SetStateAction<IBlackExamGradeElement>
  >;
  isCommon: boolean;
  educationalStatus?: EducationalStatus;
}

const WriteBlackExam = ({
  writeGradeElement,
  changeWriteGradeElement,
  setWriteGradeElement,
  isCommon,
  educationalStatus,
}: IWriteGrade) => {
  return (
    <>
      <GradeWraper title="국어">
        <Input
          type="number"
          width={230}
          name="koreanGrade"
          placeholder="검정고시 점수"
          value={writeGradeElement.koreanGrade}
          onChange={changeWriteGradeElement}
          unit="점"
        />
      </GradeWraper>
      <GradeWraper title="영어">
        <Input
          type="number"
          width={230}
          name="englishGrade"
          placeholder="검정고시 점수"
          value={writeGradeElement.englishGrade}
          onChange={changeWriteGradeElement}
          unit="점"
        />
      </GradeWraper>
      <GradeWraper title="수학">
        <Input
          type="number"
          width={230}
          name="mathGrade"
          placeholder="검정고시 점수"
          value={writeGradeElement.mathGrade}
          onChange={changeWriteGradeElement}
          unit="점"
        />
      </GradeWraper>
      <GradeWraper title="사회">
        <Input
          type="number"
          width={230}
          name="socialGrade"
          placeholder="검정고시 점수"
          value={writeGradeElement.socialGrade}
          onChange={changeWriteGradeElement}
          unit="점"
        />
      </GradeWraper>
      <GradeWraper title="과학">
        <Input
          type="number"
          width={230}
          name="scienceGrade"
          placeholder="검정고시 점수"
          value={writeGradeElement.scienceGrade}
          onChange={changeWriteGradeElement}
          unit="점수"
        />
      </GradeWraper>
      <GradeWraper title="선택 과목">
        <Input
          type="number"
          width={230}
          name="electives"
          placeholder="검정고시 점수"
          value={writeGradeElement.electivesGrade}
          onChange={changeWriteGradeElement}
          unit="점수"
        />
      </GradeWraper>
    </>
  );
};

export default WriteBlackExam;
