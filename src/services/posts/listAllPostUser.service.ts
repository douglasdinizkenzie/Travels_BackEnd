import { off } from "process";
import {
  postResponseArray,
  postsResponseArrayPaginated,
} from "../../interfaces/posts.interface";
import prisma from "../../database/prismaClient";
import { handlePaginationListAllUserPosts } from "../../utils/pagination/handlePaginationListAllUserPosts";

export const listAllPostUserService = async (
  limit: any,
  offset: any,
  userUUID: string
): Promise<postsResponseArrayPaginated> => {
  limit = Number(limit);
  if (!limit) {
    limit = 5;
  }

  offset = Number(offset);
  if (!offset) {
    offset = 0;
  }

  const userPosts: postResponseArray | null = await prisma.posts.findMany({
    where: { author_uuid: userUUID },
    skip: offset,
    take: limit,
    include: { author: true },
  });

  const { nextUrl, previousUrl, totalPosts } =
    await handlePaginationListAllUserPosts(limit, offset, userUUID);

  return {
    nextUrl,
    previousUrl,
    Total: totalPosts,
    limit,
    offset,
    posts: userPosts,
  };
};
