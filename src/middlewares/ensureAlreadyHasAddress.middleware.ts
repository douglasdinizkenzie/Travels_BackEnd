import { NextFunction, Request, Response } from "express";
import { users } from "../interfaces/users.interfaces";
import prisma from "../database/prismaClient";
import { address } from "../interfaces/address.interface";
import AppError from "../errors/app.Error";

export const ensureAlreadyHasAddressMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idUser: string = req.params.id;
  const addressExist: address | null = await prisma.address.findFirst({
    where: { user_uuid: idUser },
  });

  if (addressExist) {
    throw new AppError("You already add a address", 409);
  }

  return next();
};
