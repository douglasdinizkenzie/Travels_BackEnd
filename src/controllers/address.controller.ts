import { Request, Response } from "express";
import { address, addressRequest } from "../interfaces/address.interface";
import { createAddressService } from "../services/address/createAddress.service";

export const createAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: addressRequest = req.body;
  const id: string = req.params.id;
  const newAddress: address = await createAddressService(data, id);
  return res.status(201).json(newAddress);
};
