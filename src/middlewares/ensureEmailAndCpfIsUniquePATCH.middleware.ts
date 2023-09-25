import { NextFunction, Request, Response } from "express";
import { users } from "../interfaces/users.interfaces";
import prisma from "../database/prismaClient";
import AppError from "../errors/app.Error";

export const ensureEmailAndCpfIsUniqueMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, cpf }: { email?: string; cpf?: string } = req.body;

  const verifyIfExists = async (
    field: string,
    value: string
  ): Promise<void> => {
    const userFound: users | undefined | null = await prisma.user.findFirst({
      where: { [field]: value },
    });
    if (userFound && userFound.uuid !== res.locals.userUUID) {
      throw new AppError(`${field} already exist`, 409);
    }
  };

  if (email) await verifyIfExists("email", email);
  if (cpf) await verifyIfExists("cpf", cpf);

  next();
};
