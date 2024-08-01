import { EducationalStatus, IPatchUserType } from '@/apis/application/types';

export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export interface IApplicationFooterProps {
  current: number;
  isDisabled: boolean;
  prevClick?: () => void;
  nextClick?: () => void;
}

export interface ICurrnettype {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

export interface IUserTypeParams extends Omit<IPatchUserType, 'graduateDate' | 'educationalStatus'> {
  graduateDate: string[];
  educationalStatus: EducationalStatus | '';
}

export interface IUserPhoto {
  photo: string;
  photoFileName: File | string;
}

export interface IUserBlackExam {
  averageScore: string;
  extraScore: {
    hasCertificate: boolean;
    hasCompetitionPrize: boolean;
  };
}

export interface IUserInfo {
  applicantName: string;
  applicantTel: string;
  sex: string;
  birthDate: string[];
  parentName: string;
  parentTel: string;
  streetAddress: string;
  detailAddress: string;
  postalCode: string;
}

export interface IPatchUserMiddleSchool {
  gradeNumber: number;
  classNumber: number;
  studentNumber: string;
  schoolCode: string;
}

export interface IUserMiddleSchool {
  studentNumber: string[];
  schoolCode: string;
  teacherName: string;
}

export interface IUserMiddleSchoolName {
  schoolName: string;
}

export type GradeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export type ModalType =
  | ''
  | 'CANCEL_SUBMIT'
  | 'SIGN_OUT'
  | 'SEARCH_ADDRESS'
  | 'SEARCH_SCHOOL'
  | 'SUBMIT_MODAL'
  | 'ERROR'
  | 'SUCCESS'
  | 'ADMISSION';

export interface IModalState {
  modalState: ModalType;
  setModalState: (modalState: ModalType) => void;
}

export interface ISearchSchools {
  content: ISearchSchool[];
}

export interface ISearchSchool {
  code: string;
  name: string;
  information: string;
  address: string;
}
