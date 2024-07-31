import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Radio, theme, Dropdown } from '@entrydsm/design-system';
import {
  EditUserType,
  GetUserType,
  PatchGraduationType,
} from '@/apis/application';
import ApplicationContent from './ApplicationContent';
import ApplicationFooter from './ApplicationFooter';
import { applicationTypeDateText } from '@/constant/translate';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { generateNumberArray } from '@/utils/GenerateNumberArray';
import { ICurrnettype, IUserTypeParams } from '@/interface/type';
import { EducationalStatus } from '@/apis/application/types';

const UserType = ({ current, setCurrent }: ICurrnettype) => {
  const date = new Date();
  const {
    form: userType,
    onChange: changeUserType,
    setForm: setUserType,
  } = useInput<IUserTypeParams>({
    applicationType: '',
    isDaejeon: undefined,
    educationalStatus: '',
    graduateDate: [(date.getFullYear() + 1).toString(), '01'],
    applicationRemark: null,
    isOutOfHeadcount: false,
  });

  const { data } = GetUserType();
  const { mutateAsync: editUserType } = EditUserType();
  const { mutateAsync: editGraduationType } = PatchGraduationType();

  useEffect(() => {
    data &&
      setUserType({
        applicationType: data.applicationType,
        isDaejeon: String(data.isDaejeon),
        educationalStatus: data.educationalStatus,
        graduateDate:
          (data.graduatedDate && data.graduatedDate.split('-').splice(0, 2)) ||
          userType.graduateDate,
        applicationRemark: data.applicationRemark || '',
        isOutOfHeadcount: data.isOutOfHeadcount,
      });
  }, [data]);

  const { combinedMutations } = useCombineMutation();

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          editUserType({
            applicationType: userType.applicationType,
            isDaejeon: userType.isDaejeon,
            isOutOfHeadcount: false,
            applicationRemark: userType.applicationRemark || null,
          }),
        () =>
          editGraduationType({
            educationalStatus: userType.educationalStatus as EducationalStatus,
            graduateDate: userType.graduateDate.join('-'),
          }),
      ],
      () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent grid={3} title="전형 선택">
          <Radio
            label="일반"
            name="applicationType"
            value="COMMON"
            onClick={changeUserType}
            checked={userType.applicationType === 'COMMON'}
          />
          <Radio
            label="마이스터 인재"
            name="applicationType"
            value="MEISTER"
            onClick={changeUserType}
            checked={userType.applicationType === 'MEISTER'}
          />
          <_RadioWrapper>
            <Radio
              label="사회통합전형"
              name="applicationType"
              value="SOCIAL"
              onClick={changeUserType}
              checked={userType.applicationType === 'SOCIAL'}
            />
          </_RadioWrapper>
        </ApplicationContent>

        <ApplicationContent grid={2} title="지역 선택">
          <Radio
            label="대전"
            name="isDaejeon"
            value="true"
            onClick={changeUserType}
            checked={userType.isDaejeon === 'true'}
          />
          <Radio
            label="전국"
            name="isDaejeon"
            value="false"
            onClick={changeUserType}
            checked={userType.isDaejeon === 'false'}
          />
        </ApplicationContent>
        <ApplicationContent grid={3} title="졸업 구분">
          <Radio
            label="졸업 예정"
            name="educationalStatus"
            value="PROSPECTIVE_GRADUATE"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'PROSPECTIVE_GRADUATE'}
          />
          <Radio
            label="졸업"
            name="educationalStatus"
            value="GRADUATE"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'GRADUATE'}
          />
          <Radio
            label="검정고시"
            name="educationalStatus"
            value="QUALIFICATION_EXAM"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'QUALIFICATION_EXAM'}
          />
        </ApplicationContent>

        <ApplicationContent
          grid={2}
          title={
            (userType.educationalStatus &&
              applicationTypeDateText[userType.educationalStatus]) ||
            ''
          }
        >
          <Dropdown
            className="graduateDate"
            width={85}
            value={userType.graduateDate[0]}
            onChange={(year) =>
              setUserType({
                ...userType,
                graduateDate: [year, userType.graduateDate[1]],
              })
            }
            options={generateNumberArray(2010, date.getFullYear() + 1)}
            unit="년"
          />
          <Dropdown
            className="graduateDate"
            width={85}
            value={userType.graduateDate[1]}
            onChange={(month) =>
              setUserType({
                ...userType,
                graduateDate: [userType.graduateDate[0], month],
              })
            }
            options={generateNumberArray(1, 12)}
            unit="월"
          />
        </ApplicationContent>
        <ApplicationContent grid={3} title="특기사항">
          <Radio
            label="해당없음"
            name="applicationRemark"
            value=""
            onClick={changeUserType}
            checked={userType.applicationRemark === ''}
          />
          <Radio
            label="국가 유공자"
            name="applicationRemark"
            value="NATIONAL_MERIT"
            onClick={changeUserType}
            checked={userType.applicationRemark === 'NATIONAL_MERIT'}
          />
          <Radio
            label="특례 입학 대상"
            name="applicationRemark"
            value="PRIVILEGED_ADMISSION"
            onClick={changeUserType}
            checked={userType.applicationRemark === 'PRIVILEGED_ADMISSION'}
          />
        </ApplicationContent>
      </_ApplicationWrapper>
      <ApplicationFooter
        current={current}
        isDisabled={false}
        nextClick={onNextClick}
      />
    </>
  );
};

export default UserType;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;

const _RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
