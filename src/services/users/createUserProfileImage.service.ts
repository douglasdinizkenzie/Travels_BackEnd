import "dotenv";
import cloudinary from "../../cloudnaryConfig";
import { users } from "../../interfaces/users.interfaces";
import prisma from "../../database/prismaClient";
import { userSchemaResponse } from "../../schemas/user.schema";
import { unlink } from "fs";
import { destroyImageInCloudinary } from "../../utils/cloudinary/destroyImageInCloudinary";

export const createUserProfileImageService = async (
  uploadImage: Express.Multer.File,
  userUUID: string
) => {
  const user: users | undefined | null = await prisma.user.findFirst({
    where: { uuid: userUUID },
  });

  await destroyImageInCloudinary(user?.image, userUUID);

  const urlImage = await cloudinary.uploader.upload(
    uploadImage.path,
    { resource_type: "image" },
    (error, result) => {
      console.log(error);
      return result;
    }
  );

  const newUser: users = await prisma.user.update({
    where: { uuid: userUUID },
    data: { image: urlImage.secure_url },
    include: { address: true },
  });

  unlink(uploadImage.path, (err) => {
    console.log(err);
  });

  return userSchemaResponse.parse(newUser);
};
