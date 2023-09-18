import { posts } from "../../interfaces/posts.interface";
import cloudinary from "../../cloudnaryConfig";
import prisma from "../../database/prismaClient";
import { postsSchema } from "../../schemas/posts.schemas";
import { destroyImageInCloudinary } from "../../utils/cloudinary/destroyImageInCloudinary";
import { unlink } from "fs";

export const createPostImageService = async (
  postUUID: string,
  image: Express.Multer.File
): Promise<posts> => {
  const previousPost: posts | null = await prisma.posts.findFirst({
    where: { uuid: postUUID },
    include: { author: true },
  });

  await destroyImageInCloudinary(previousPost?.image);

  await prisma.posts.update({
    where: { uuid: postUUID },
    data: { image: null },
  });

  const imageURL = await cloudinary.uploader.upload(
    image.path,
    { resource_type: "image" },
    (error, result) => {
      console.log(error);
      return result;
    }
  );

  const postWithImage = await prisma.posts.update({
    where: { uuid: postUUID },
    data: { image: imageURL.secure_url },
    include: { author: true },
  });

  unlink(image.path, (err) => {
    if (err) {
      console.log(err);
    }
  });

  return postsSchema.parse(postWithImage);
};
