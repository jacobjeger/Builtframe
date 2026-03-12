import { Resend } from 'resend';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || '');
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const FROM_EMAIL = 'Builtframe <notifications@builtframe.com>';

export async function sendMagicLinkEmail(
  clientEmail: string,
  clientName: string,
  projectName: string,
  magicToken: string
) {
  const portalUrl = `${APP_URL}/portal/${magicToken}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: clientEmail,
    subject: `You've been invited to review ${projectName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #4F46E5;">Builtframe</h2>
        <p>Hi ${clientName},</p>
        <p>You've been invited to review <strong>${projectName}</strong>. Click the link below to view your project, leave feedback, and communicate with your developer.</p>
        <a href="${portalUrl}" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">Open Your Portal</a>
        <p style="color: #6B7280; font-size: 14px;">Or copy this link: ${portalUrl}</p>
      </div>
    `,
  });
}

export async function sendAnnotationNotification(
  devEmail: string,
  clientName: string,
  projectName: string,
  projectId: string
) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: devEmail,
    subject: `New feedback on ${projectName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #4F46E5;">Builtframe</h2>
        <p><strong>${clientName}</strong> left a new annotation on <strong>${projectName}</strong>.</p>
        <a href="${APP_URL}/dashboard/projects/${projectId}" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">View Annotation</a>
      </div>
    `,
  });
}

export async function sendMessageNotification(
  recipientEmail: string,
  senderName: string,
  projectName: string,
  link: string
) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: recipientEmail,
    subject: `New message on ${projectName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #4F46E5;">Builtframe</h2>
        <p><strong>${senderName}</strong> sent you a message on <strong>${projectName}</strong>.</p>
        <a href="${link}" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">View Message</a>
      </div>
    `,
  });
}

export async function sendReplyNotification(
  clientEmail: string,
  devName: string,
  projectName: string,
  magicToken: string
) {
  const portalUrl = `${APP_URL}/portal/${magicToken}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: clientEmail,
    subject: `New reply on ${projectName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #4F46E5;">Builtframe</h2>
        <p><strong>${devName}</strong> replied to your feedback on <strong>${projectName}</strong>.</p>
        <a href="${portalUrl}" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">View Reply</a>
      </div>
    `,
  });
}
