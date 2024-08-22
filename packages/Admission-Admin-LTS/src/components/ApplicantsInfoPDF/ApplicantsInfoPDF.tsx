import React from 'react';
import { IGetPdfApplicatnsInfoResponse } from '@/utils/api/admin/types';
import styled from '@emotion/styled';
import { PDFDownloadLink, Document, Page, pdf, Text, Font, View } from '@react-pdf/renderer';

const ApplicantsInfoPDF = ({ ...props }: IGetPdfApplicatnsInfoResponse) => {
  Font.register({
    family: 'SpoqaHanSans',
    src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
  });

  return (
    <>
      <div className="WordSection2">
        <p className="MsoNormal" style={{ textAlign: 'center', margin: 0 }}>
          <b>
            <Text
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'SpoqaHanSans',
                margin: '0 10px',
              }}
            >
              인적사항
            </Text>
            <div style={{ margin: '0 10px', border: '1px solid black' }}>
              <Text style={{ textAlign: 'left', fontSize: '12px', fontFamily: 'SpoqaHanSans' }}>
                이름: {props.name}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '12px', fontFamily: 'SpoqaHanSans' }}>
                접수 번호: {props.receipt_code}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '12px', fontFamily: 'SpoqaHanSans' }}>
                주소: {props.address}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '12px', fontFamily: 'SpoqaHanSans' }}>
                학교 이름: {props.school_name}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '12px', fontFamily: 'SpoqaHanSans' }}>
                전화번호: {props.telephone_number}
              </Text>
            </div>
            <br />
            <br />
            <Text
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'SpoqaHanSans',
                margin: '0 10px',
              }}
            >
              자기소개서
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: '10px',
                fontFamily: 'SpoqaHanSans',
                border: '1px solid black',
                padding: '10px 20px',
                margin: '0 10px',
              }}
            >
              {props.self_introduce}
            </Text>
            <br />
            <br />
            <Text
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'SpoqaHanSans',
                margin: '0 10px',
              }}
            >
              학업계획서
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: '10px',
                fontFamily: 'SpoqaHanSans',
                border: '1px solid black',
                padding: '10px 20px',
                margin: '0 10px',
              }}
            >
              {props.study_plan}
            </Text>
          </b>
        </p>
      </div>
      {/* <table
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0px',
          border: '1px solid black',
          width: '100%',
          marginBottom: '50px',
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'center', width: '7%' }}>
              인적
              <br />
              사항
            </td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '10%' }}>성명</td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '20%' }}>
              {props.name}
            </td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '10%' }}>
              접 수 번 호
            </td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '20%' }}>
              {props.receipt_code}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '10%' }}>연락처</td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '20%' }}>
              {props.telephone_number}
            </td>
            <View style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '10%' }}>
              출신 중학교
            </View>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '20%' }} colSpan={3}>
              {props.school_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '10%' }}>주소</td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '10px', width: '20%' }} colSpan={3}>
              {props.address}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0px',
          border: '1px solid black',
          width: '100%',
          marginBottom: '50px',
          textAlign: 'left',
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'left', fontSize: '15.5px' }}>
              ◎ <b>자기소개서</b> 내용은 특별한 형식이 없으며 개인의 특성 및 성장 과정, 취미·특기, 학교 생활, 가족
              안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완·발전시켜야 할 단점에 대하여
              기술하십시오.
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', minHeight: '230px', textAlign: 'left', padding: '0px 7px' }}>
              <p style={{ lineHeight: '25px' }}>(빈칸 포함 1,600자 이내)</p>
              <p style={{ minHeight: '230px', wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
                {props.self_introduce}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          borderCollapse: 'collapse',
          borderSpacing: '0px',
          border: '1px solid black',
          width: '100%',
          marginBottom: '50px',
        }}
      > 
      <tbody>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'left', fontSize: '15.5px' }}>
              <Text>
                ◎ <b>학업계획서</b>는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자
                하는
                <br />
                목표를 달성하기 위한 학업계획을 상세하게 기술하십시오.
              </Text>
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', minHeight: '230px', textAlign: 'left', padding: '0px 7px' }}>
              <Text style={{ lineHeight: '25px' }}>(빈칸 포함 1,600자 이내)</Text>
              <Text style={{ minHeight: '230px' }}>{props.study_plan}</Text>
            </td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};

export default ApplicantsInfoPDF;

const _TD = styled.td`
  border: 1px solid black;
  text-align: center;
`;

const _TABLE = styled.table`
  border-collapse: collapse;
  border-spacing: 0px;
  border: 1px solid black;
  width: 100%;
`;
