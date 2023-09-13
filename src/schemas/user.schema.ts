import { z } from "zod";

export const userSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().max(100),
  image: z.string().max(255).nullish(),
  email: z.string().max(255).email(),
  cpf: z.string().max(14),
  phone: z.string().max(120).nullish(),
  date_of_birth: z.string().max(12),
  description: z.string().nullish(),
  password: z.string().max(255),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const userSchemaRequest = userSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  image: true,
});

export const userSchemaResponse = userSchema
  .omit({
    password: true,
  })
  .extend({
    address: z
      .object({
        uuid: z.string(),
        cep: z.string(),
        state: z.string(),
        city: z.string(),
      })
      .nullish(),
  });

export const userSchemaResponseArray = userSchemaResponse.array();

export const userSchemaUpdate = userSchemaRequest
  .omit({ password: true })
  .deepPartial();
