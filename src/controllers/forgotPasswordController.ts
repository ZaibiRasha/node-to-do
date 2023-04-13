import { Request, Response } from 'express';
import {User}  from '../models/user.model';
import { sendResetPasswordEmail } from '../utils/sendEmail';
import crypto from 'crypto';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = new Date(Date.now() + 3600000); // expires in 1 hour

    await user.save();
    await sendResetPasswordEmail(email, resetToken);
    return res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
