export type HeadCountType = 'OUT_OF_HEADCOUNT' | 'IN_OF_HEADCOUNT' | null;

export type ApplicationType = 'MEISTER' | 'COMMON' | 'SOCIAL';

export type EducationStatusType = 'GRADUATE' | 'PROSPECTIVE_GRADUATE' | 'QUALIFICATION_EXAM';

export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export type ScheduleType =
  | 'NOT_APPLICATION_PERIOD'
  | 'START_DATE'
  | 'END_DATE'
  | 'APPLICATION_PERIOD'
  | 'BEFORE_FIRST_ANNOUNCEMENT'
  | 'FIRST_ANNOUNCEMENT'
  | 'BEFORE_INTERVIEW'
  | 'INTERVIEW'
  | 'BEFORE_SECOND_ANNOUNCEMENT'
  | 'SECOND_ANNOUNCEMENT'
  | 'END';
