import { z } from "zod";
import { addressSchema, addressSchemaRequest } from "../schemas/address.schema";

export type address = z.infer<typeof addressSchema>;
export type addressRequest = z.infer<typeof addressSchemaRequest>;
