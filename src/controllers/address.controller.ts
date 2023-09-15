import { Request, Response } from "express";
import { address, addressRequest } from "../interfaces/address.interface";
import { createAddressService } from "../services/address/createAddress.service";

export const createAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: addressRequest = req.body;
  const uuid: string = req.params.uuid;
  const newAddress: address = await createAddressService(data, uuid);
  return res.status(201).json(newAddress);
};
