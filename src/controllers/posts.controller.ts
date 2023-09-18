import { Request, Response } from "express";
import {
  posts,
  postsRequest,
  postsRequestUpdate,
} from "../interfaces/posts.interface";
import { createPostService } from "../services/posts/createPost.service";
import { editPostService } from "../services/posts/editPost.service";
import AppError from "../errors/app.Error";
import { createPostImageService } from "../services/posts/createPostImage.service";

export const createPostsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userUUID: string = res.locals.userUUID;
  const dataPost: postsRequest = req.body;

  const newPost: posts = await createPostService(userUUID, dataPost);

  return res.status(201).json(newPost);
};

export const editPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const postUUID: string = req.params.uuid;
  const dataPostPatch: postsRequestUpdate = req.body;

  const newPost: posts = await editPostService(dataPostPatch, postUUID);

  return res.status(200).json(newPost);
};

export const createPostImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const postUUID: string = req.params.uuid;
  const image: Express.Multer.File | undefined = req.file;

  if (image) {
    const postWithImage: posts = await createPostImageService(postUUID, image);
    return res.status(201).json(postWithImage);
  } else {
    return res.status(401).json({
      Message: "Unsupported format, try JPG, JPEG or PNG.",
    });
  }
};
