import { NextFunction, Request, Response } from "express";
import { posts } from "../interfaces/posts.interface";
import prisma from "../database/prismaClient";
import AppError from "../errors/app.Error";

export const ensurePostExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postUUID: string = req.params.uuid;
  const post: posts | null = await prisma.posts.findFirst({
    where: { uuid: postUUID },
    include: { author: true },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return next();
};
