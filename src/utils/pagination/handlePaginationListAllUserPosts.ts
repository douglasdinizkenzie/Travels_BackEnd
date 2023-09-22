import prisma from "../../database/prismaClient";

export const handlePaginationListAllUserPosts = async (
  limit: any,
  offset: any,
  userUUID: string
) => {
  const totalPosts = await prisma.posts.count({
    where: { author_uuid: userUUID },
  });
  const nextPage = limit + offset;

  const nextUrl =
    nextPage < totalPosts
      ? `/posts/user?offset=${nextPage}&limit=${limit}`
      : null;

  const previous = offset - limit < 0 ? null : offset - limit;

  const previousUrl =
    previous != null ? `/posts/user?offset=${previous}&limit=${limit}` : null;

  return { totalPosts, nextUrl, previousUrl };
};
