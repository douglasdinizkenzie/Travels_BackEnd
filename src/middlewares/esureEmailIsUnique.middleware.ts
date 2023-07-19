import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import AppError from "../errors/app.Error";

export const ensureEmailAndCpfIsUniquePOSTMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailReq = req.body.email;
  const cpfReq = req.body.cpf;

  const emailExists = await prisma.user.findFirst({
    where: { email: emailReq },
  });

  if (emailExists) {
    throw new AppError("User already exists", 409);
  }

  const cpfExists = await prisma.user.findFirst({
    where: { cpf: cpfReq },
  });
  if (cpfExists) {
    throw new AppError("User already exists", 409);
  }
  return next();
};
