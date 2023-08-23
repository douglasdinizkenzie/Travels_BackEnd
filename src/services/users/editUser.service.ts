import prisma from "../../database/prismaClient";
import {
  users,
  usersRequestUpdate,
  usersResponse,
} from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

export const editUserService = async (
  dataRequest: usersRequestUpdate,
  userId: string
): Promise<usersResponse> => {
  const newUser: users = await prisma.user.update({
    where: { uuid: userId },
    data: { ...dataRequest },
    include: { address: true },
  });

  return userSchemaResponse.parse(newUser);
};
