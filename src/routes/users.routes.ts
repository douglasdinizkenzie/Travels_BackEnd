import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/user.schema";
import { ensureEmailAndCpfIsUniquePOSTMiddlware } from "../middlewares/esureEmailIsUnique.middleware";
import {
  createUserController,
  listUserInfosController,
} from "../controllers/users.controller";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailAndCpfIsUniquePOSTMiddlware,
  createUserController
);

usersRoutes.get("/info", ensureIsAuthMiddleware, listUserInfosController);
