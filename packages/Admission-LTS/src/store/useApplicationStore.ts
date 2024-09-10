import {
  ApplicationRemark,
  ApplicationType,
  EducationalStatus,
} from '@/apis/application/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserType {
  applicationType: ApplicationType | '';
  educationStatus: EducationalStatus | '';
  isDaejeon: undefined | boolean;
  graduateDate: string[];
  applicationRemark: ApplicationRemark | null;
  veteransNumber: undefined | number;
}

interface UserTypeState {
  userTypeState: UserType;
  setUserTypeState: (userType: UserType) => void;
  clearUserTypeState: () => void;
}

export const useUserTypeStore = create<UserTypeState>()(
  devtools((set) => ({
    userTypeState: {
      applicationType: '',
      educationStatus: '',
      isDaejeon: undefined,
      graduateDate: [(new Date().getFullYear() + 1).toString(), '01'],
      applicationRemark: null,
      veteransNumber: undefined,
    },
    setUserTypeState: (userType) => set({ userTypeState: { ...userType } }),
    clearUserTypeState: () =>
      set({
        userTypeState: {
          applicationType: '',
          educationStatus: '',
          isDaejeon: undefined,
          graduateDate: [(new Date().getFullYear() + 1).toString(), '01'],
          applicationRemark: null,
          veteransNumber: undefined,
        },
      }),
  })),
);

interface UserInfo {
  applicantName: string;
  applicantTel: string;
  sex: string;
  birthDate: string[];
  parentName: string;
  parentTel: string;
  parentRelation: string;
  streetAddress: string;
  detailAddress: string;
  postalCode: string;
}

interface UserInfoState {
  userInfoState: UserInfo;
  setUserInfoState: (uesrInfo: UserInfo) => void;
  clearUserInfoState: () => void;
}

export const useUserInfoStore = create<UserInfoState>()(
  devtools((set) => ({
    userInfoState: {
      applicantName: '',
      applicantTel: '',
      sex: '',
      birthDate: [(new Date().getFullYear() - 15).toString(), '01', '01'],
      parentName: '',
      parentTel: '',
      parentRelation: '',
      streetAddress: '',
      detailAddress: '',
      postalCode: '',
    },
    setUserInfoState: (userInfo: UserInfo) =>
      set({ userInfoState: { ...userInfo } }),
    clearUserInfoState: () =>
      set({
        userInfoState: {
          applicantName: '',
          applicantTel: '',
          sex: '',
          birthDate: [(new Date().getFullYear() - 15).toString(), '01', '01'],
          parentName: '',
          parentTel: '',
          parentRelation: '',
          streetAddress: '',
          detailAddress: '',
          postalCode: '',
        },
      }),
  })),
);

interface UserFile {
  photo: string;
  photoFileName: string | File;
}

interface UserFileState {
  userFileState: UserFile;
  setUserFile: (userFile: UserFile) => void;
  clearUserFile: () => void;
}

export const useFileStore = create<UserFileState>()(
  devtools((set) => ({
    userFileState: {
      photo: '',
      photoFileName: '',
    },
    setUserFile: (userFile) => set({ userFileState: { ...userFile } }),
    clearUserFile: () =>
      set({
        userFileState: {
          photo: '',
          photoFileName: '',
        },
      }),
  })),
);

interface UserMiddleSchool {
  studentNumber: string[];
  schoolCode: string;
  teacherName: string;
  teacherTel: string;
}

interface UserMiddleSchoolState {
  userMiddleSchoolState: UserMiddleSchool;
  setUserMiddleSchoolState: (userMiddleSchool: UserMiddleSchool) => void;
  clearUserMiddleSchoolState: () => void;
}

export const useMiddleSchoolStore = create<UserMiddleSchoolState>()(
  devtools((set) => ({
    userMiddleSchoolState: {
      studentNumber: ['', '', ''],
      schoolCode: '',
      teacherName: '',
      teacherTel: '',
    },
    setUserMiddleSchoolState: (userMiddleSchool) =>
      set({ userMiddleSchoolState: { ...userMiddleSchool } }),
    clearUserMiddleSchoolState: () =>
      set({
        userMiddleSchoolState: {
          studentNumber: ['', '', ''],
          schoolCode: '',
          teacherName: '',
          teacherTel: '',
        },
      }),
  })),
);
