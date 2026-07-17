/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import nodemailer from 'nodemailer';

export interface EmailState {
  success: boolean;
  message: string;
}

export async function sendEmail(prevState: any, formData: FormData): Promise<EmailState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Form Validation Sanity Guard
  if (!firstName || !lastName || !email || !message) {
    return { success: false, message: 'All form fields are required.' };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.GMAIL_USERNAME}>`,
      to: 'ask@touchandpay.me', // ◄─ Redirects directly to TAP's destination address
      subject: `TAP Contact Form: Message from ${firstName} ${lastName}`,
      replyTo: email,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Message From TAP Web Contact Form</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    });

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Nodemailer error:', error);
    return { success: false, message: 'Failed to send your message. Please try again later.' };
  }
}