import { z } from "zod";
import { userSchemaResponse } from "./user.schema";

export const addressSchema = z.object({
  uuid: z.string().uuid(),
  cep: z.string().max(8),
  state: z.string().max(4),
  city: z.string().max(50),
  user_uuid: userSchemaResponse,
});

export const addressSchemaRequest = addressSchema.omit({
  uuid: true,
  user_uuid: true,
});
