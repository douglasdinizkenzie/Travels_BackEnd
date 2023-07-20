import { compare } from "bcryptjs";
import prisma from "../../database/prismaClient";
import AppError from "../../errors/app.Error";
import { login } from "../../interfaces/login.interface";
import jwt from "jsonwebtoken";
import "dotenv";

export const loginService = async (data: login): Promise<string> => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (!user) {
    throw new AppError("Email or Password invalid!", 401);
  }

  const confirmPassword = await compare(data.password, user.password);

  if (!confirmPassword) {
    throw new AppError("Email or Password invalid!", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    String(process.env.SECRET_KEY!),
    { expiresIn: process.env.EXPIRES_IN, subject: user.uuid.toString() }
  );

  return token;
};
