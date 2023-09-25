import prisma from "../../database/prismaClient";
import { destroyImageInCloudinary } from "../../utils/cloudinary/destroyImageInCloudinary";

export const deletePostService = async (postUUID: string): Promise<void> => {
  const post = await prisma.posts.findFirst({ where: { uuid: postUUID } });
  await destroyImageInCloudinary(post?.image);
  await prisma.posts.delete({ where: { uuid: postUUID } });

  return;
};
