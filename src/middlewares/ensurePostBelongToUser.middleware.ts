import { NextFunction, Request, Response } from "express";
import prisma from "../database/prismaClient";
import { posts } from "../interfaces/posts.interface";
import AppError from "../errors/app.Error";

export const ensurePostBelongToUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userUUID: string = res.locals.userUUID;
  const postUUID: string = req.params.uuid;

  const post: posts | null = await prisma.posts.findFirst({
    where: { uuid: postUUID },
    include: { author: true },
  });

  if (post?.author_uuid != userUUID) {
    throw new AppError("You do not have permission to edit this post", 401);
  }

  return next();
};
