import prisma from "../../database/prismaClient";
import { posts, postsRequest } from "../../interfaces/posts.interface";
import { postsSchema } from "../../schemas/posts.schemas";

export const createPostService = async (
  userUUID: string,
  dataPost: postsRequest
): Promise<posts> => {
  const newPost = await prisma.posts.create({
    data: { ...dataPost, author_uuid: userUUID },
    include: { author: true },
  });

  return postsSchema.parse(newPost);
};
