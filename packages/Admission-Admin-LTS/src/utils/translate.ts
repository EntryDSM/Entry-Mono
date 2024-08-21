import { ApplicationType, EducationStatusType } from '@/interface/type';

export const applicationTypeToKorean: Record<ApplicationType, string> = {
  COMMON: '일반',
  MEISTER: '마이스터',
  SOCIAL: '사회통합',
};

export const educationStatusTypeToKorean: Record<EducationStatusType, string> = {
  GRADUATE: '졸업',
  PROSPECTIVE_GRADUATE: '졸업 예정자',
  QUALIFICATION_EXAM: '검정 고시',
};
