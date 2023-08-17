import prisma from "../../database/prismaClient";
import { users, usersResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

export const listUserInfosService = async (
  userId: string
): Promise<usersResponse> => {
  const user: users | undefined | null = await prisma.user.findFirst({
    where: { uuid: userId },
    include: { address: true },
  });

  return userSchemaResponse.parse(user);
};
