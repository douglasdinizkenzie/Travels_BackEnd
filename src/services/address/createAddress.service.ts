import prisma from "../../database/prismaClient";
import { address, addressRequest } from "../../interfaces/address.interface";
import { addressSchema } from "../../schemas/address.schema";

export const createAddressService = async (
  data: addressRequest,
  id: string
): Promise<address> => {
  const newAddress = await prisma.address.create({
    data: { ...data, user_uuid: id },
    include: { user: true },
  });

  return addressSchema.parse(newAddress);
};
