import cloudinary from "../../cloudnaryConfig";
import prisma from "../../database/prismaClient";

export const destroyImageInCloudinary = async (
  imageURL: string | undefined | null,
  userUUID: string
): Promise<void> => {
  if (imageURL) {
    const imageIdCloudinary: string = imageURL.split("/").pop()!.split(".")[0];
    await cloudinary.uploader.destroy(
      imageIdCloudinary,
      { resource_type: "image" },
      (error, result) => {
        console.log(error);
      }
    );

    await prisma.user.update({
      where: { uuid: userUUID },
      data: { image: null },
    });
  }

  return;
};
