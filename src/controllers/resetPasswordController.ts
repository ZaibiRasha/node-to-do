import { Request, Response } from 'express';
import User from '../models/User';

export const resetPassword = async (req: Request, res: Response) => {
  const { resetToken, password } = req.body;
  try {
    const user = await User.findOne({ where: { resetToken } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }
    const now = Date.now();
    if (now > user.resetTokenExpiresAt!.getTime()) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
    await user.save();
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
