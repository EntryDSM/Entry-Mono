import { getApplicantDetail } from '@/utils/api/admin';
import { regex } from '@/utils/regex';
import {
  applicationTypeToKorean,
  educationStatusTypeToKorean,
} from '@/utils/translate';
import styled from '@emotion/styled';
import { Button, HStack, Text, theme, VStack } from '@entrydsm/design-system';
import React, { useState } from 'react';

interface IPropsType {
  receiptCode: string;
}

export const StudentInfo = ({ receiptCode }: IPropsType) => {
  const { phone_number } = regex;

  const { data: applciation_detail } = getApplicantDetail(receiptCode);

  const [isIntroduce, setIsIntroduce] = useState(true);
  return (
    <>
      {applciation_detail?.status.isSubmit ? (
        <VStack>
          <_Img src={applciation_detail?.moreInformation.photoUrl} alt="" />
          <Grid>
            <VStack gap={10}>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  이름
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.commonInformation.name}
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  생년월일
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.moreInformation.birthDay}
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  주소
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.moreInformation.address}
                </Text>
              </HStack>
              <HR />
              <Text color="black900" size="title2">
                지원 정보
              </Text>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  학교 이름
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.commonInformation.schoolName}
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  졸업 상태
                </Text>
                <Text color="black900" size="body2">
                  {
                    educationStatusTypeToKorean[
                      applciation_detail?.moreInformation.educationalStatus
                    ]
                  }
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  전형
                </Text>
                <Text color="black900" size="body2">
                  {
                    applicationTypeToKorean[
                      applciation_detail?.moreInformation.applicationType
                    ]
                  }
                </Text>
              </HStack>
              <HR />
              <Text color="black900" size="title2">
                지원 정보
              </Text>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  학생 본인 연락처
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.commonInformation.telephoneNumber}
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  부모님 연락처
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.commonInformation.parentTel}
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  학교 연락처
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.commonInformation.schoolTel}
                </Text>
              </HStack>
            </VStack>
            <VStack gap={10}>
              <Text color="black900" size="title2">
                성적 및 봉사 정보
              </Text>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  봉사시간
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.volunteerTime}시간
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  성적 점수
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.conversionScore}점
                </Text>
              </HStack>
              <HR />
              <Text color="black900" size="title2">
                출석 정보
              </Text>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  무단 결석 일수
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.dayAbsenceCount}점
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  무단 조퇴 일수
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.earlyLeaveCount}일
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  무단 결과 일수
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.lectureAbsenceCount}점
                </Text>
              </HStack>
              <HStack align="center" gap={20}>
                <Text color="black900" size="body1">
                  무단 지각 일수
                </Text>
                <Text color="black900" size="body2">
                  {applciation_detail?.evaluation.latenessCount}일
                </Text>
              </HStack>
            </VStack>
          </Grid>
          <HStack margin={[40, 0, 10, 0]} gap={10}>
            <Button
              color="green"
              kind={isIntroduce ? 'contained' : 'outlined'}
              onClick={() => {
                setIsIntroduce(true);
              }}
            >
              자기소개서
            </Button>
            <Button
              color="green"
              kind={isIntroduce ? 'outlined' : 'contained'}
              onClick={() => {
                setIsIntroduce(false);
              }}
            >
              학업 계획서
            </Button>
          </HStack>
          {/* <Text color="black900" size="body2"></Text> */}
          <div
            style={{
              color: '#141414',
              fontSize: '18px',
              fontWeight: '400',
              textWrap: 'wrap',
              wordBreak: 'break-all',
            }}
          >
            {(isIntroduce
              ? (applciation_detail?.evaluation.selfIntroduce ?? '')
              : (applciation_detail?.evaluation.studyPlan ?? '')
            )
              .split('\n')
              .map((str, index) => {
                return (
                  <React.Fragment key={index}>
                    {str}
                    <br />
                  </React.Fragment>
                );
              })}
          </div>
        </VStack>
      ) : (
        <>
          <VStack gap={20}>
            <Text color="black900" size="title3" margin={[40, 0, 20, 0]}>
              최종제출 미완료 사용자는 기본 인적사항만 표시됩니다
            </Text>
            <HStack gap={20} align="center">
              <Text color="black900" size="body1">
                이름
              </Text>
              <Text color="black900" size="body3">
                {applciation_detail?.commonInformation.name}
              </Text>
            </HStack>
            <HStack gap={20} align="center">
              <Text color="black900" size="body1">
                학교 이름
              </Text>
              <Text color="black900" size="body3">
                {applciation_detail?.commonInformation.schoolName}
              </Text>
            </HStack>
            <HStack gap={20} align="center">
              <Text color="black900" size="body1">
                학생 본인 연락처
              </Text>
              <Text color="black900" size="body3">
                {phone_number(
                  String(applciation_detail?.commonInformation.telephoneNumber),
                )}
              </Text>
            </HStack>
            <HStack gap={20} align="center">
              <Text color="black900" size="body1">
                부모님 연락처
              </Text>
              <Text color="black900" size="body3">
                {phone_number(
                  String(applciation_detail?.commonInformation.parentTel),
                )}
              </Text>
            </HStack>
            <HStack gap={20} align="center">
              <Text color="black900" size="body1">
                학교 전화번호
              </Text>
              <Text color="black900" size="body3">
                {phone_number(
                  String(applciation_detail?.commonInformation.schoolTel),
                )}
              </Text>
            </HStack>
          </VStack>
        </>
      )}
    </>
  );
};

const _Img = styled.img`
  width: 150px;
  height: 150px;
  margin: 40px 0;
`;

const HR = styled.hr`
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background-color: ${theme.color.black100};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 75px;
`;
