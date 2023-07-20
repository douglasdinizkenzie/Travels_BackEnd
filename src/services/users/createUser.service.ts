import prisma from "../../database/prismaClient";
import { usersRequest, usersResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";
import { hashSync } from "bcryptjs";

export const createUserService = async (
  data: usersRequest
): Promise<usersResponse> => {
  const { password, ...rest } = data;
  const encryptedPassword = hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: { ...rest, password: encryptedPassword },
  });
  return userSchemaResponse.parse(newUser);
};
