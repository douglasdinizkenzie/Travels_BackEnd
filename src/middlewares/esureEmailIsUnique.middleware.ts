import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import AppError from "../errors/app.Error";
import { users } from "../interfaces/users.interfaces";

export const ensureEmailAndCpfIsUniquePOSTMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailReq: string = req.body.email;
  const cpfReq: string = req.body.cpf;

  const emailExists: users | null = await prisma.user.findFirst({
    where: { email: emailReq },
  });

  if (emailExists) {
    throw new AppError("User already exists", 409);
  }

  const cpfExists: users | null = await prisma.user.findFirst({
    where: { cpf: cpfReq },
  });

  if (cpfExists) {
    throw new AppError("User already exists", 409);
  }

  return next();
};
