import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import {
  createUserController,
  createUserProfileImageController,
  deleteUserController,
  editUserController,
  listAllUsersController,
  listUserInfosController,
} from "../controllers/users.controller";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";
import { ensureEmailAndCpfIsUniqueMiddlware } from "../middlewares/ensureEmailAndCpfIsUniquePATCH.middleware";
import { upload } from "../middlewares/uploadImages.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailAndCpfIsUniqueMiddlware,
  createUserController
);

usersRoutes.patch(
  "/profile/image",
  upload.single("image"),
  createUserProfileImageController
);

usersRoutes.get("/info", ensureIsAuthMiddleware, listUserInfosController);

usersRoutes.get("", ensureIsAuthMiddleware, listAllUsersController);

usersRoutes.patch(
  "",
  ensureIsAuthMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailAndCpfIsUniqueMiddlware,
  editUserController
);

usersRoutes.delete("", ensureIsAuthMiddleware, deleteUserController);
