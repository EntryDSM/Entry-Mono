import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dropdown,
  HStack,
  Input,
  Radio,
  Stack,
  Text,
  VStack,
  theme,
  Skeleton,
} from '@entrydsm/design-system';
import DaumPostCode from 'react-daum-postcode';
import {
  EditUserInfo,
  EditUserPhoto,
  GetUserInfo,
  GetUserProfile,
} from '@/apis/application';
import ApplicationContent from './ApplicationContent';
import ApplicationFooter from './ApplicationFooter';
import Modal from '../Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { generateNumberArray } from '@/utils/GenerateNumberArray';
import { ICurrnettype, IUserInfo, IUserPhoto } from '@/interface/type';
import { dataURLtoFile } from '@/utils/dataURLtoFile';

const UserInfo = ({ current, setCurrent }: ICurrnettype) => {
  const date = new Date();
  const {
    form: userInfo,
    setForm: setUserInfo,
    onChange: changeUserInfo,
  } = useInput<IUserInfo>({
    applicantName: '',
    applicantTel: '00000000000',
    sex: '',
    birthDate: [(date.getFullYear() - 15).toString(), '01', '01'],
    parentName: '',
    parentTel: '',
    parentRelation: '',
    streetAddress: '',
    detailAddress: '',
    postalCode: '',
  });
  const { form: userPhoto, setForm: setUserPhoto } = useInput<IUserPhoto>({
    photo: '',
    photoFileName: '',
  });

  const { data: userProfile, isLoading: isUserProfileLoading } =
    GetUserProfile();
  const { data: getUserInfo, isLoading: isUserInfoLoading } = GetUserInfo();

  const inputRef = useRef<HTMLInputElement>(null);
  const { close, modalState, setModalState } = useModal();

  const { mutateAsync: patchUserPhoto } = EditUserPhoto();
  const { mutateAsync: patchUserInfo } = EditUserInfo();
  const { combinedMutations } = useCombineMutation();

  const [imgFile, setImgFile] = useState<File>();

  const initImgFile = async (dataurl: string) => {
    const res = await dataURLtoFile(dataurl);
    return res;
  };

  useEffect(() => {
    initImgFile(getUserInfo?.photoPath!).then((file) => setImgFile(file));
  }, [getUserInfo?.photoPath]);

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      if (files.length === 0) {
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setUserPhoto({
            photo: reader.result as string,
            photoFileName: files[0],
          });
        };
      }
    }
  };

  const handleAddress = (data: any) => {
    close();
    setUserInfo({
      ...userInfo,
      streetAddress: data?.address,
      postalCode: data?.zonecode,
    });
  };

  const handleImage = () => {
    if (inputRef.current) inputRef.current.click();
  };

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      [userProfile?.isParent ? 'parentName' : 'applicantName']:
        userProfile?.name,
      [userProfile?.isParent ? 'parentTel' : 'applicantTel']:
        userProfile?.phoneNumber.replace(/-/g, ''),
    });
  }, [userProfile]);

  useEffect(() => {
    getUserInfo &&
      getUserInfo!.birthDate &&
      setUserInfo({
        applicantName: getUserInfo.applicantName,
        parentName: getUserInfo.parentName,
        parentTel: getUserInfo.parentTel,
        parentRelation: getUserInfo.parentRelation,
        postalCode: getUserInfo.postalCode,
        detailAddress: getUserInfo.detailAddress,
        sex: getUserInfo.sex,
        streetAddress: getUserInfo.streetAddress,
        applicantTel: getUserInfo.applicantTel,
        birthDate: getUserInfo.birthDate.split('-'),
      });
    getUserInfo &&
      getUserInfo!.photoPath &&
      setUserPhoto({
        photo: getUserInfo.photoPath,
        photoFileName: imgFile!,
      });
  }, [getUserInfo, imgFile]);

  const isDisabled =
    Object.values(userInfo).some((item) => !!item === false) ||
    userPhoto.photo === 'data:image/png;base64,null';

  const onNextClick = (mode: 'Before' | 'After') => {
    combinedMutations(
      [
        () =>
          patchUserInfo({
            ...userInfo,
            applicantTel: userInfo.applicantTel.replace(/-/g, ''),
            birthDate: userInfo.birthDate.join('-'),
            parentTel: userInfo.parentTel.replace(/-/g, ''),
          }),
        () => patchUserPhoto({ photo: userPhoto.photoFileName as File }),
      ],
      () => setCurrent(mode === 'Before' ? current - 1 : current + 1),
    );
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'parentTel' || name === 'applicantTel') {
      const formattedValue = formatPhoneNumber(value);
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent title="증명사진" grid={1}>
          <Stack align="center" gap={20}>
            <_ApplicationImg onClick={handleImage}>
              {isUserProfileLoading ? (
                <Skeleton
                  width={200}
                  height={250}
                  isLoaded={isUserProfileLoading}
                />
              ) : userPhoto.photo !== 'data:image/png;base64,null' ? (
                <Img src={userPhoto.photo} alt="사진을 다시 입력해주세요" />
              ) : (
                <Text color="black700" size="body3">
                  원서 사진을 등록해주세요
                </Text>
              )}
              <_ApplicationImgInput
                ref={inputRef}
                type="file"
                accept=".png, .jpg, .jpeg"
                name="img"
                onChange={saveImgFile}
              />
            </_ApplicationImg>
            <Button icon="Upload" color="orange" onClick={handleImage}>
              사진 업로드
            </Button>
          </Stack>
        </ApplicationContent>

        <ApplicationContent grid={1} title="이름">
          {isUserInfoLoading ? (
            <Skeleton width={230} height={42} isLoaded={isUserInfoLoading} />
          ) : (
            <Input
              type="text"
              placeholder="이름"
              width={230}
              name="applicantName"
              value={userInfo.applicantName}
              onChange={changeUserInfo}
              disabled={!userProfile?.isParent}
            />
          )}
        </ApplicationContent>

        <ApplicationContent grid={2} title="성별">
          {isUserInfoLoading ? (
            <Skeleton width={340} height={26} isLoaded={isUserInfoLoading} />
          ) : (
            <>
              <Radio
                label="남자"
                name="sex"
                value="MALE"
                onClick={changeUserInfo}
                checked={userInfo.sex === 'MALE'}
              />
              <Radio
                label="여자"
                name="sex"
                value="FEMALE"
                onClick={changeUserInfo}
                checked={userInfo.sex === 'FEMALE'}
              />
            </>
          )}
        </ApplicationContent>

        <ApplicationContent grid={3} title="생년월일">
          {isUserInfoLoading ? (
            <Skeleton width={510} height={42} isLoaded={isUserInfoLoading} />
          ) : (
            <>
              <Dropdown
                className="birthDate"
                width={85}
                value={userInfo.birthDate[0]}
                onChange={(year) =>
                  setUserInfo({
                    ...userInfo,
                    birthDate: [
                      year,
                      userInfo.birthDate[1],
                      userInfo.birthDate[2],
                    ],
                  })
                }
                options={generateNumberArray(2000, date.getFullYear())}
                unit="년"
              />
              <Dropdown
                className="birthDate"
                width={85}
                value={userInfo.birthDate[1]}
                onChange={(month) =>
                  setUserInfo({
                    ...userInfo,
                    birthDate: [
                      userInfo.birthDate[0],
                      month,
                      userInfo.birthDate[2],
                    ],
                  })
                }
                options={generateNumberArray(1, 12)}
                unit="월"
              />
              <Dropdown
                className="birthDate"
                width={85}
                value={userInfo.birthDate[2]}
                onChange={(date) =>
                  setUserInfo({
                    ...userInfo,
                    birthDate: [
                      userInfo.birthDate[0],
                      userInfo.birthDate[1],
                      date,
                    ],
                  })
                }
                options={generateNumberArray(1, 31)}
                unit="일"
              />
            </>
          )}
        </ApplicationContent>

        <ApplicationContent
          grid={1}
          title="본인 연락처"
          placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요"
        >
          {isUserInfoLoading ? (
            <Skeleton width={230} height={42} isLoaded={isUserInfoLoading} />
          ) : (
            <Input
              type="text"
              placeholder="본인 연락처"
              width={230}
              name="applicantTel"
              maxLength={13}
              value={userInfo.applicantTel}
              onChange={handleInput}
              disabled={!userProfile?.isParent}
            />
          )}
        </ApplicationContent>

        <ApplicationContent grid={2} title="보호자명" gap={30}>
          <_InputBox>
            {isUserInfoLoading ? (
              <Skeleton width={230} height={42} isLoaded={isUserInfoLoading} />
            ) : (
              <Input
                type="text"
                placeholder="보호자명"
                width={230}
                name="parentName"
                value={userInfo.parentName}
                onChange={changeUserInfo}
                disabled={userProfile?.isParent}
              />
            )}
            {isUserInfoLoading ? (
              <Skeleton width={220} height={42} isLoaded={isUserInfoLoading} />
            ) : (
              <Input
                type="text"
                placeholder="관계"
                width={220}
                name="parentRelation"
                value={userInfo.parentRelation}
                onChange={changeUserInfo}
              />
            )}
          </_InputBox>
        </ApplicationContent>

        <ApplicationContent
          grid={1}
          title="보호자 연락처"
          placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요"
        >
          {isUserInfoLoading ? (
            <Skeleton width={230} height={42} isLoaded={isUserInfoLoading} />
          ) : (
            <Input
              type="text"
              placeholder="보호자 연락처"
              width={230}
              maxLength={13}
              name="parentTel"
              value={userInfo.parentTel}
              onChange={handleInput}
              disabled={userProfile?.isParent}
            />
          )}
        </ApplicationContent>

        <ApplicationContent grid={1} title="주소">
          <VStack margin={[30, 0]} gap={10}>
            <HStack gap={20}>
              {isUserInfoLoading ? (
                <Skeleton
                  width={125}
                  height={42}
                  isLoaded={isUserInfoLoading}
                />
              ) : (
                <Input
                  name="postalCode"
                  type="text"
                  width={125}
                  placeholder="우편번호"
                  value={userInfo.postalCode}
                  disabled
                />
              )}
              {isUserInfoLoading ? (
                <Skeleton
                  width={240}
                  height={42}
                  isLoaded={isUserInfoLoading}
                />
              ) : (
                <Input
                  name="address"
                  type="text"
                  width={240}
                  placeholder="기본주소"
                  value={userInfo.streetAddress}
                  disabled
                />
              )}
              <Button
                kind="outlined"
                onClick={() => {
                  setModalState('SEARCH_ADDRESS');
                }}
              >
                검색
              </Button>
            </HStack>
            <HStack gap={20}>
              {isUserInfoLoading ? (
                <Skeleton
                  width={485}
                  height={42}
                  isLoaded={isUserInfoLoading}
                />
              ) : (
                <Input
                  name="detailAddress"
                  type="text"
                  width={485}
                  placeholder="상세주소"
                  onChange={changeUserInfo}
                  value={userInfo.detailAddress}
                />
              )}
            </HStack>
          </VStack>
        </ApplicationContent>
        {modalState === 'SEARCH_ADDRESS' && (
          <Modal onClose={close}>
            <DaumPostCode onComplete={handleAddress} />
          </Modal>
        )}
      </_ApplicationWrapper>
      <ApplicationFooter
        current={current}
        isDisabled={isDisabled}
        prevClick={onNextClick}
        nextClick={onNextClick}
      />
    </>
  );
};
export default UserInfo;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
  overflow-x: hidden;
`;

const _ApplicationImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 250px;
  margin: 30px 0px;
  background-color: ${theme.color.black50};
  border: 1px solid ${theme.color.black100};
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const _ApplicationImgInput = styled.input`
  display: none;
`;

const _InputBox = styled.div`
  display: flex;
  gap: 30px;
`;
