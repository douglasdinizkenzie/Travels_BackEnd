import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import { AppError } from "../errors";

export const ensureEmailAndCpfIsUniquePOSTMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailExists = await prisma.user.findFirst({
    where: { email: req.body.email },
  });
  if (emailExists) {
    throw new AppError("User already exists", 409);
  }

  const cpfExists = await prisma.user.findFirst({
    where: { cpf: req.body.cpf },
  });
  if (cpfExists) {
    throw new AppError("User already exists");
  }
  return next();
};
