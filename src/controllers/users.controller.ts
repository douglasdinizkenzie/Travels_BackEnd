import { Request, Response } from "express";
import { usersRequest, usersResponse } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: usersRequest = req.body;
  const newUser: usersResponse = await createUserService(data);
  return res.status(200).json(newUser);
};
