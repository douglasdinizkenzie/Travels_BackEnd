import prisma from "../../database/prismaClient";
import {
  postResponseArray,
  postsResponseArrayPaginated,
} from "../../interfaces/posts.interface";
import { handlePaginationListAllPosts } from "../../utils/pagination/handlePaginationListAllPosts";

export const listAllPostsService = async (
  limit: any,
  offset: any
): Promise<postsResponseArrayPaginated> => {
  limit = Number(limit);
  offset = Number(offset);
  if (!limit) {
    limit = 10;
  }
  if (!offset) {
    offset = 0;
  }

  const { nextUrl, previousUrl, total } = await handlePaginationListAllPosts(
    limit,
    offset
  );

  const posts: postResponseArray = await prisma.posts.findMany({
    include: { author: true },
    skip: offset,
    take: limit,
  });

  return {
    nextUrl,
    previousUrl,
    Total: total,
    offset,
    limit,
    posts: posts,
  };
};
