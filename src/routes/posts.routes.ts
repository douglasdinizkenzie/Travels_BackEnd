import { Router } from "express";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  postsSchemaRequest,
  postsSchemaRequestUpdate,
} from "../schemas/posts.schemas";
import {
  createPostImageController,
  createPostsController,
  deletePostController,
  editPostController,
  listAllPostUserController,
} from "../controllers/posts.controller";
import { ensurePostExistsMiddleware } from "../middlewares/ensurePostExists.middleware";
import { ensurePostBelongToUserMiddleware } from "../middlewares/ensurePostBelongToUser.middleware";
import { upload } from "../middlewares/uploadImages.middleware";

export const postRoutes: Router = Router();

postRoutes.use(ensureIsAuthMiddleware);

postRoutes.post(
  "",
  ensureDataIsValidMiddleware(postsSchemaRequest),
  createPostsController
);

postRoutes.patch(
  "/:uuid",
  ensureDataIsValidMiddleware(postsSchemaRequestUpdate),
  ensurePostExistsMiddleware,
  ensurePostBelongToUserMiddleware,
  editPostController
);

postRoutes.patch(
  "/image/:uuid",
  ensurePostExistsMiddleware,
  ensurePostBelongToUserMiddleware,
  upload.single("post"),
  createPostImageController
);

postRoutes.delete(
  "/:uuid",
  ensurePostExistsMiddleware,
  ensurePostBelongToUserMiddleware,
  deletePostController
);

postRoutes.get("/user", listAllPostUserController);
