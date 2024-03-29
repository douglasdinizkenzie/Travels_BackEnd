import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import { address } from "../interfaces/address.interface";
import AppError from "../errors/app.Error";

export const ensureAlreadyHasAddressMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userUUID: string = req.params.uuid;
  const addressExist: address | null = await prisma.address.findFirst({
    where: { user_uuid: userUUID },
  });

  if (addressExist) {
    throw new AppError("You already add a address", 409);
  }

  return next();
};
