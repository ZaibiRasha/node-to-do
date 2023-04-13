import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Reset Password Link',
    text: `Click on the link below to reset your password:\n\nhttp://localhost:3000/reset-password?token=${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
};
