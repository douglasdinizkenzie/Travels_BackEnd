import prisma from "../../database/prismaClient";

export const deleteUserService = async (userId: string): Promise<void> => {
  await prisma.user.delete({ where: { uuid: userId } });

  return;
};
