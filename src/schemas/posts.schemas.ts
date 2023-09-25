import { z } from "zod";
import { userSchemaResponse } from "./user.schema";

export const postsSchema = z.object({
  uuid: z.string().uuid(),
  post: z.string(),
  image: z.string().max(255).nullish(),
  author: userSchemaResponse,
  author_uuid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const postsSchemaRequest = postsSchema.omit({
  uuid: true,
  author: true,
  author_uuid: true,
  image: true,
  createdAt: true,
  updatedAt: true,
});

export const postsSchemaRequestUpdate = postsSchemaRequest.deepPartial();

export const postsSchemaArray = postsSchema.array();
