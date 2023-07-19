import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/user.schema";
import { ensureEmailAndCpfIsUniquePOSTMiddlware } from "../middlewares/esureEmailIsUnique.middleware";
import { createUserController } from "../controllers/users.controller";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailAndCpfIsUniquePOSTMiddlware,
  createUserController
);
