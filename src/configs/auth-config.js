// ForgotPassword.js
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models";
import {
  nodemailer_user,
  nodemailer_pass,
  tokenSecret,
  SaltRounds,
} from "./ServerConfigs";

const ForgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "No user with this email exists" });
    }
    const token = generatePasswordResetToken(user);
    await sendingEmail(user, token);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generatePasswordResetToken = (user) => {
  return jwt.sign(
    {
      data: user.email,
    },
    tokenSecret,
    { expiresIn: "10min" }
  );
};

const sendingEmail = async (user, token) => {
  const resetPasswordLink = `http://localhost:3000/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: nodemailer_user,
      pass: nodemailer_pass,
    },
  });

  await transporter.sendMail({
    from: '"Blood Hub" <bloodhub@gmail.com>',
    to: user.email,
    subject: "Reset Password",
    text: `Hello, Please click on the following link to reset your password: ${resetPasswordLink}`,
    html: `<p>Hello,</p><p>Please click on the following link to reset your password:</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`,
  });

  console.log("Password reset email sent successfully");
};

// ResetPassword.js

const ResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, tokenSecret);

    // Find user by email
    const user = await User.findOne({ email: decoded.data });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, SaltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { ResetPassword, ForgotPassword };
