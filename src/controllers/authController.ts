import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
  const { name, password, email} = req.body;
  
  

  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(401).send({ message:"EMAIL_EXISTS"});
  }
  const newUser =User.create({
    name: name,
    email: email,
    password:password
  })
  return res.status(202).send({ message: `name : ${name} , email : ${email}` });

} catch (error) {
  res.status(500).send({ success: false, message: "MSG.SQL_ERROR" });
}

};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json(user);
};


export const logout = (req: Request, res: Response) => {
  // Destroy the current session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    res.json({ message: "Logged out successfully" });
  });
};
