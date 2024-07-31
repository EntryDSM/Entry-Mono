import { ApplicationRemark, ApplicationType, EducationalStatus, getApplicationType } from '@/apis/application/types';

export type applicationType =
  | '기초생활수급자'
  | '한부모가족'
  | '소년소녀가장'
  | '차상위계층'
  | '북한이탈주민'
  | '다문화가정'
  | '보호대상아동'
  | '국가유공자'
  | '특례입학대상';

export const applicationRemarkSelector: Record<applicationType, ApplicationRemark> = {
  기초생활수급자: 'BASIC_LIVING',
  한부모가족: 'ONE_PARENT',
  소년소녀가장: 'TEEN_HOUSEHOLDER',
  차상위계층: 'LOWEST_INCOME',
  북한이탈주민: 'FROM_NORTH',
  다문화가정: 'MULTICULTURAL',
  보호대상아동: 'PROTECTED_CHILDREN',
  국가유공자: 'NATIONAL_MERIT',
  특례입학대상: 'PRIVILEGED_ADMISSION',
} as const;

export const applicationTypeGenerator: Record<getApplicationType, ApplicationType> = {
  일반전형: 'COMMON',
  마이스터전형: 'MEISTER',
  사회통합전형: 'SOCIAL',
};

export const applicationTypeDateText: Record<EducationalStatus, string> = {
  PROSPECTIVE_GRADUATE: '졸업예정 연월',
  GRADUATE: '졸업 연월',
  QUALIFICATION_EXAM: '검정고시 합격 연월',
};
