export interface IPatchUserBlackExam {
  averageScore: number;
}

export interface IGetUserBlackExam {
  averageScore: string;
}

export interface IPatchGraduation {
  volunteerTime: number;
  absenceDayCount: number;
  lectureAbsenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  koreanGrade: string;
  socialGrade: string;
  historyGrade: string;
  mathGrade: string;
  scienceGrade: string;
  englishGrade: string;
  techAndHomeGrade: string;
  extraScore: {
    hasCertificate: boolean;
    hasCompetitionPrize: boolean;
  };
}

export interface ISelectGradeElement {
  koreanGrade: string[];
  socialGrade: string[];
  historyGrade: string[];
  mathGrade: string[];
  scienceGrade: string[];
  englishGrade: string[];
  techAndHomeGrade: string[];
}

export interface IWriteGradeElement {
  volunteerTime: number;
  absenceDayCount: number;
  lectureAbsenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  extraScore: ExtraScore;
}

export type ExtraScore = {
  hasCertificate: boolean;
  hasCompetitionPrize: boolean;
};
