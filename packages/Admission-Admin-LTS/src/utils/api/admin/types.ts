import { ApplicationType, EducationStatusType, HeadCountType } from '@/interface/type';

export interface IApplicationListRequest {
  size: number;
  page: number;
  isDaejeon: boolean;
  isNationwide: boolean;
  isSubmitted: boolean;
  isNotSubmitted: boolean;
  isCommon: boolean;
  isMeister: boolean;
  isSocial: boolean;
  inOfHeadcount: boolean;
  outOfHeadcount: boolean;
  receiptCode: string;
  schoolName: string;
  name: string;
}

export interface IApplicationListResponse {
  total_elements: number;
  total_pages: number;
  applicants: IApplicant[];
}

export interface IApplicant {
  receiptCode: number;
  name: string;
  telephoneNumber: string;
  isDaejeon: boolean;
  applicationType: ApplicationType;
  isPrintsArrived: boolean;
  isSubmitted: boolean;
  isOutOfHeadcount: boolean;
  // headcount: HeadCountType;
}

export interface IApplicationCountRequest {
  applicationType: ApplicationType;
  isDaejeon: boolean;
  count: number;
}

export interface IApplicationDetailResponse {
  status: {
    isPrintedArrived: boolean;
    isSubmit: boolean;
  };
  commonInformation: {
    name: string;
    schoolName: string | null;
    telephoneNumber: string;
    schoolTel: string | null;
    parentTel: string;
  };
  moreInformation: {
    photoUrl: string;
    birthDay: string;
    educationalStatus: EducationStatusType;
    applicationType: ApplicationType;
    applicationRemark: string | null;
    address: string;
    detailAddress: string;
    headCount: boolean | null;
  };
  evaluation: {
    volunteerTime: number;
    conversionScore: number;
    dayAbsenceCount: number;
    lectureAbsenceCount: number;
    earlyLeaveCount: number;
    latenessCount: number;
    averageScore: number;
    selfIntroduce: string;
    studyPlan: string;
  };
}

//특별전형 점수
export interface ISpecialScoreDistribution {
  firstRate: number;
  secondRate: number;
  thirdRate: number;
  fourthRate: number;
  fifthRate: number;
  sixthRate: number;
  seventhRate: number;
  eighthRate: number;
  // '98-110': number;
  // '85-97': number;
  // '72-84': number;
  // '59-71': number;
  // '46-58': number;
  // '33-45': number;
  // '20-32': number;
  // '-19': number;
  application_type: 'MEISTER' | 'SOCIAL';
  daejeon: boolean;
}

//일반전형 점수
export interface ICommonScoreDistribution {
  firstRate: number;
  secondRate: number;
  thirdRate: number;
  fourthRate: number;
  fifthRate: number;
  sixthRate: number;
  seventhRate: number;
  eighthRate: number;
  // '158-170': number;
  // '145-157': number;
  // '132-144': number;
  // '119-131': number;
  // '106-118': number;
  // '93-105': number;
  // '80-92': number;
  // '-79': number;
  applicationType: 'COMMON';
  daejeon: boolean;
}

export interface IGetScoreStatisticsResponse {
  0: ICommonScoreDistribution;
  1: ICommonScoreDistribution;
  2: ISpecialScoreDistribution;
  3: ISpecialScoreDistribution;
  4: ISpecialScoreDistribution;
  5: ISpecialScoreDistribution;
}

export type IGetPdfApplicatnsInfoResponse = {
  name: string;
  receipt_code: number;
  telephone_number: string;
  school_name: string;
  address: string;
  self_introduce: string;
  study_plan: string;
};
