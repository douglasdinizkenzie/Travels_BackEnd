import { z } from "zod";
import {
  postsSchema,
  postsSchemaRequest,
  postsSchemaRequestUpdate,
} from "../schemas/posts.schemas";

export type posts = z.infer<typeof postsSchema>;
export type postsRequest = z.infer<typeof postsSchemaRequest>;
export type postsRequestUpdate = z.infer<typeof postsSchemaRequestUpdate>;
