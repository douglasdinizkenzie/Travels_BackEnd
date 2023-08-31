import prisma from "../../database/prismaClient";
import {
  users,
  usersResponseArray,
  usersResponsePaginated,
} from "../../interfaces/users.interfaces";
import { userSchemaResponseArray } from "../../schemas/user.schema";
import { handlePaginationListAllUsers } from "./handlePagination/handlePagination";

export const listAllUsersService = async (
  limit: any,
  offset: any,
  name: any,
  currentUrl: string
): Promise<usersResponsePaginated> => {
  limit = Number(limit);
  if (!limit) {
    limit = 5;
  }

  offset = Number(offset);
  if (!offset) {
    offset = 0;
  }

  const users: users[] = await prisma.user.findMany({
    where: {
      name: {
        contains: name || "",
        mode: "insensitive",
      },
    },
    skip: offset,
    take: limit,
    include: { address: true },
  });

  const usersFormatted: usersResponseArray =
    userSchemaResponseArray.parse(users);

  const { previousUrl, nextUrl, totalUsers } =
    await handlePaginationListAllUsers(limit, offset, currentUrl, name);

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total: totalUsers,
    users: usersFormatted,
  };
};
