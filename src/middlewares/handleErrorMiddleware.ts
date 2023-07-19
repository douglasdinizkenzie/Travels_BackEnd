import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app.Error";
import { ZodError } from "zod";

export const handlerError = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  console.log(err);
  return res.status(400).json({
    message: err.message,
  });
};
