import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import { users } from "../interfaces/users.interfaces";
import AppError from "../errors/app.Error";

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idParams: string = req.params.uuid;
  const user: users | null = await prisma.user.findFirst({
    where: { uuid: idParams },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};
