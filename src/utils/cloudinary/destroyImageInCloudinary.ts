import cloudinary from "../../cloudnaryConfig";

export const destroyImageInCloudinary = async (
  imageURL: string | undefined | null
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
  }

  return;
};
