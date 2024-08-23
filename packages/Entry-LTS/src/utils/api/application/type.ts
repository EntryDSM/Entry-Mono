export interface IGetUserInfo {
  name: string;
  phoneNumber: string;
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
