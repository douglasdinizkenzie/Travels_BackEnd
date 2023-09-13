import prisma from "../../database/prismaClient";

export const handlePaginationListAllUsers = async (
  limit: number,
  offset: number,
  currentUrl: string,
  name: any
) => {
  const totalUsers: number = await prisma.user.count();

  const nextPage = offset + limit;
  const nextUrl =
    nextPage < totalUsers
      ? `${currentUrl}?${
          name ? `name=${name}&` : ""
        }limit=${limit}&offset=${nextPage}`
      : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null
      ? `${currentUrl}?${
          name ? `name=${name}&` : ""
        }limit=${limit}&offset=${previous}`
      : null;

  return { previousUrl, nextUrl, totalUsers };
};
