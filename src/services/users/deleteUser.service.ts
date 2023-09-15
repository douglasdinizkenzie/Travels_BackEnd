import prisma from "../../database/prismaClient";
import { users } from "../../interfaces/users.interfaces";
import { destroyImageInCloudinary } from "../../utils/cloudinary/destroyImageInCloudinary";

export const deleteUserService = async (userUUID: string): Promise<void> => {
  const user: users | null = await prisma.user.findFirst({
    where: { uuid: userUUID },
  });
  await destroyImageInCloudinary(user?.image);
  await prisma.user.delete({ where: { uuid: userUUID } });
  return;
};
