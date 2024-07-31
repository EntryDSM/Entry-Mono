import { GradeType } from '@/interface/type';

export const gradeArr: GradeType[] = ['A', 'B', 'C', 'D', 'E', 'X'];

export const subject = {
  국어: 'koreanGrade',
  사회: 'socialGrade',
  역사: 'historyGrade',
  수학: 'mathGrade',
  과학: 'scienceGrade',
  기술가정: 'techAndHomeGrade',
  영어: 'englishGrade',
};

export const gradeToScore: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};
