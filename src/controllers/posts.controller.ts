import { Request, Response } from "express";
import {
  posts,
  postsRequest,
  postsRequestUpdate,
} from "../interfaces/posts.interface";
import { createPostService } from "../services/posts/createPost.service";
import { editPostService } from "../services/posts/editPost.service";

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
