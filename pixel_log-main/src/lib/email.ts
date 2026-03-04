import { Resend } from 'resend';
import { serviceTypeLabels } from './validations';
import type { Consultation } from '@/types';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';
const FROM_EMAIL = 'PIXEL-LOG <noreply@pixel-log.com>';

export async function sendConsultationEmail(consultation: Consultation) {
  const client = getResendClient();
  // Send notification to admin
  await client.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[새 상담 요청] ${consultation.name}님 - ${serviceTypeLabels[consultation.service_type]}`,
    html: `
      <div style="font-family: 'Pretendard', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1A1F3D; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #F5C542; margin: 0; font-size: 24px;">새로운 상담 요청</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 120px;">이름</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D; font-weight: 600;">${consultation.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">이메일</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D;">
                <a href="mailto:${consultation.email}" style="color: #F5C542;">${consultation.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">연락처</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D;">
                <a href="tel:${consultation.phone}" style="color: #F5C542;">${consultation.phone}</a>
              </td>
            </tr>
            ${consultation.company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">회사명</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D;">${consultation.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">서비스</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D;">${serviceTypeLabels[consultation.service_type]}</td>
            </tr>
            ${consultation.budget ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">예산</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1A1F3D;">${consultation.budget}</td>
            </tr>
            ` : ''}
          </table>
          <div style="margin-top: 20px;">
            <h3 style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">문의 내용</h3>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #1A1F3D; margin: 0; white-space: pre-wrap; line-height: 1.6;">${consultation.message}</p>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  // Send confirmation to user
  await client.emails.send({
    from: FROM_EMAIL,
    to: consultation.email,
    subject: '[PIXEL-LOG] 상담 신청이 접수되었습니다',
    html: `
      <div style="font-family: 'Pretendard', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1A1F3D; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: #F5C542; margin: 0; font-size: 24px;">PIXEL-LOG</h1>
          <p style="color: white; margin: 10px 0 0; font-size: 14px;">상담 신청이 접수되었습니다</p>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="color: #1A1F3D; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
            안녕하세요, ${consultation.name}님!<br><br>
            PIXEL-LOG에 상담 신청해 주셔서 감사합니다.<br>
            귀하의 문의가 성공적으로 접수되었습니다.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <h3 style="color: #1A1F3D; font-size: 14px; margin: 0 0 12px;">접수 내역</h3>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>서비스:</strong> ${serviceTypeLabels[consultation.service_type]}<br>
              <strong>접수일:</strong> ${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
            담당자가 검토 후 24시간 이내에 연락드리겠습니다.<br>
            급한 문의는 아래 연락처로 연락해 주세요.
          </p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              이메일: postpr0727@gmail.com<br>
              본 메일은 발신 전용이며, 회신되지 않습니다.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}
