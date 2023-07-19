import { z } from "zod";

export const userSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().max(100),
  email: z.string().max(255).email(),
  cpf: z.string().max(14),
  phone: z.string().max(120).nullish(),
  date_of_birth: z.string().max(12),
  description: z.string().nullish(),
  password: z.string().max(255),
});

export const userSchemaRequest = userSchema.omit({
  uuid: true,
});

export const userSchemaResponse = userSchema.omit({
  password: true,
});

export const userSchemaUpdate = userSchemaRequest.deepPartial();
