import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import {
  createUserController,
  deleteUserController,
  editUserController,
  listUserInfosController,
} from "../controllers/users.controller";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";
import { ensureEmailAndCpfIsUniqueMiddlware } from "../middlewares/ensureEmailAndCpfIsUniquePATCH.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailAndCpfIsUniqueMiddlware,
  createUserController
);

usersRoutes.get("/info", ensureIsAuthMiddleware, listUserInfosController);

usersRoutes.patch(
  "",
  ensureIsAuthMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailAndCpfIsUniqueMiddlware,
  editUserController
);

usersRoutes.delete("", ensureIsAuthMiddleware, deleteUserController);
