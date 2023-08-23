import { Request, Response } from "express";
import {
  usersRequest,
  usersRequestUpdate,
  usersResponse,
} from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { listUserInfosService } from "../services/users/listUserInfos.service";
import { editUserService } from "../services/users/editUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: usersRequest = req.body;
  const newUser: usersResponse = await createUserService(data);
  return res.status(201).json(newUser);
};

export const listUserInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = res.locals.userId;
  const userInfos: usersResponse = await listUserInfosService(userId);

  return res.status(200).json(userInfos);
};

export const editUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: usersRequestUpdate = req.body;
  const userId: string = res.locals.userId;
  const user: usersResponse = await editUserService(data, userId);
  return res.status(200).json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = res.locals.userId;
  await deleteUserService(userId);
  return res.status(204).json();
};
