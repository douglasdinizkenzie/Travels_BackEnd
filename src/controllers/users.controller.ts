import { Request, Response } from "express";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body);
  return res.status(200).json(req.body);
};
