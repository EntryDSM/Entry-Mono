export type EducationalStatus =
  | 'PROSPECTIVE_GRADUATE'
  | 'GRADUATE'
  | 'QUALIFICATION_EXAM';

export type ApplicationType = 'COMMON' | 'MEISTER' | 'SOCIAL';

export type getApplicationType = '일반전형' | '마이스터전형' | '사회통합전형';

export type ApplicationRemark =
  | 'ONE_PARENT'
  | 'FROM_NORTH'
  | 'MULTICULTURAL'
  | 'BASIC_LIVING'
  | 'LOWEST_INCOME'
  | 'TEEN_HOUSEHOLDER'
  | 'PRIVILEGED_ADMISSION'
  | 'NATIONAL_MERIT'
  | 'PROTECTED_CHILDREN'
  | 'NOTHING'
  | '';

export interface IGetUSerType {
  educationalStatus: EducationalStatus;
  applicationType: ApplicationType;
  applicationRemark: ApplicationRemark;
  isDaejeon: boolean;
  isOutOfHeadcount: boolean;
  graduatedDate: string;
  veteransNumber: number;
}

export interface IPatchUserType {
  applicationType: ApplicationType | '';
  isDaejeon: string | undefined;
  applicationRemark: ApplicationRemark | null;
  isOutOfHeadcount: boolean;
  veteransNumber?: number;
}

export interface IPatchGraduationType {
  graduateDate: string;
  educationalStatus: EducationalStatus;
}

export interface IGetUserInfo {
  sex: string;
  birthDate: string;
  applicantName: string;
  applicantTel: string;
  parentName: string;
  parentTel: string;
  parentRelation: string;
  streetAddress: string;
  postalCode: string;
  detailAddress: string;
  photoPath: string;
}

export interface IPatchUserInfo {
  applicantName: string;
  sex: string;
  birthDate: string;
  parentName: string;
  parentTel: string;
  applicantTel: string;
  streetAddress: string;
  detailAddress: string;
  postalCode: string;
}

export interface IPatchUserPhoto {
  photo: File;
}

export interface IUserMiddleSchool {
  name: string;
  sex: string;
  birthDate: string;
  schoolCode: string;
  schoolTel: string;
  schoolName: string;
  parentName: string;
  parentTel: string;
  applicantTel: string;
  streetAddress: string;
  detailAddress: string;
  postalCode: string;
  photoPath: string;
  studentNumber: {
    gradeNumber: string;
    classNumber: string;
    studentNumber: string;
  };
  teacherName: string;
  teacherTel: string;
}

export interface IPatchUserIntroduce {
  content: string;
}

export interface IPatchUserPlan {
  content: string;
}

export interface IGetDocumentInfo {
  receiptCode: number;
  phoneNumber: string;
  name: string;
  isSubmitted: boolean;
  isPrintedArrived: boolean;
  applicationType: 'MEISTER' | 'COMMON' | 'SOCIAL';
  selfIntroduce: string;
  studyPlan: string;
}
