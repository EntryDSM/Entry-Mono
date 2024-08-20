import { ScheduleType } from '@/interface/type';

export interface IEditScheduleRequest {
  type: ScheduleType;
  date: string;
}

export interface IGetScheduleResponse {
  schedules: IEditScheduleRequest[];
  current_status: ScheduleType;
}
