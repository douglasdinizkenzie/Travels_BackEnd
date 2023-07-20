import { Request, Response } from "express";
import { loginService } from "../services/login/login.service";
import { login } from "../interfaces/login.interface";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: login = req.body;
  const token: string = await loginService(data);
  return res.status(200).json({
    token: token,
  });
};
