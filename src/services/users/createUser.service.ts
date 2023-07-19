import prisma from "../../database/prismaClient";
import { usersRequest, usersResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

export const createUserService = async (
  data: usersRequest
): Promise<usersResponse> => {
  const newUser = await prisma.user.create({ data: { ...data } });
  return userSchemaResponse.parse(newUser);
};
