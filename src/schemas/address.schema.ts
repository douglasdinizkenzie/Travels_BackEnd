import { z } from "zod";
import { userSchemaResponse } from "./user.schema";

export const addressSchema = z.object({
  uuid: z.string().uuid(),
  cep: z.string().max(11),
  state: z.string().max(4),
  city: z.string().max(50),
  user_uuid: z.string(),
  user: userSchemaResponse.nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const addressSchemaRequest = addressSchema.omit({
  uuid: true,
  user_uuid: true,
  user: true,
  createdAt: true,
  updatedAt: true,
});
