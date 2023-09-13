import prisma from "../../database/prismaClient";
import { users } from "../../interfaces/users.interfaces";
import { destroyImageInCloudinary } from "../../utils/cloudinary/destroyImageInCloudinary";

export const deleteUserService = async (userId: string): Promise<void> => {
  const user: users | null = await prisma.user.findFirst({
    where: { uuid: userId },
  });
  await destroyImageInCloudinary(user?.image, userId);
  await prisma.user.delete({ where: { uuid: userId } });
  return;
};
