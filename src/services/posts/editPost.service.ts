import prisma from "../../database/prismaClient";
import { posts, postsRequestUpdate } from "../../interfaces/posts.interface";
import { postsSchema } from "../../schemas/posts.schemas";

export const editPostService = async (
  data: postsRequestUpdate,
  postUUID: string
): Promise<posts> => {
  const newPost: posts = await prisma.posts.update({
    where: { uuid: postUUID },
    data: { ...data },
    include: { author: true },
  });

  return postsSchema.parse(newPost);
};
