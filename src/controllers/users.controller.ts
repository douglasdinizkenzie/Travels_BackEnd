import { Request, Response } from "express";
import {
  users,
  usersRequest,
  usersRequestUpdate,
  usersResponse,
  usersResponsePaginated,
} from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { listUserInfosService } from "../services/users/listUserInfos.service";
import { editUserService } from "../services/users/editUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { createUserProfileImageService } from "../services/users/createUserProfileImage.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: usersRequest = req.body;
  const newUser: usersResponse = await createUserService(data);
  return res.status(201).json(newUser);
};

export const createUserProfileImageController = async (
  req: Request,
  res: Response
) => {
  const userUpload: Express.Multer.File | undefined = req.file;
  const userUUID: string = res.locals.userUUID;

  if (userUpload) {
    const newUser = await createUserProfileImageService(userUpload, userUUID);
    return res.status(200).json(newUser);
  } else {
    return res.status(401).json({
      Message: "Unsupported format, try JPG, JPEG or PNG.",
    });
  }
};

export const listUserInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userUUID: string = res.locals.userUUID;
  const userInfos: usersResponse = await listUserInfosService(userUUID);

  return res.status(200).json(userInfos);
};

export const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { limit, offset, name } = req.query;
  const currentUrl: string = req.baseUrl;

  const usersPaginated: usersResponsePaginated = await listAllUsersService(
    limit,
    offset,
    name,
    currentUrl
  );

  return res.status(200).json(usersPaginated);
};

export const editUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: usersRequestUpdate = req.body;
  const userUUID: string = res.locals.userUUID;
  const user: usersResponse = await editUserService(data, userUUID);
  return res.status(200).json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userUUID: string = res.locals.userUUID;
  await deleteUserService(userUUID);
  return res.status(204).json();
};
