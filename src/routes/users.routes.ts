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
import { listAllPostUserController } from "../controllers/posts.controller";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailAndCpfIsUniqueMiddlware,
  createUserController
);

usersRoutes.patch(
  "/profile/image",
  ensureIsAuthMiddleware,
  upload.single("profile"),
  createUserProfileImageController
);

usersRoutes.get("/infos", ensureIsAuthMiddleware, listUserInfosController);

usersRoutes.get("", ensureIsAuthMiddleware, listAllUsersController);

usersRoutes.patch(
  "",
  ensureIsAuthMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailAndCpfIsUniqueMiddlware,
  editUserController
);

usersRoutes.delete("", ensureIsAuthMiddleware, deleteUserController);

usersRoutes.get(
  "/posts/:uuid",
  ensureIsAuthMiddleware, 
  ensureUserExistsMiddleware, 
  listAllPostUserController,
  );
