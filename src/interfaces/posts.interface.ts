import { z } from "zod";
import {
  postsSchema,
  postsSchemaArray,
  postsSchemaRequest,
  postsSchemaRequestUpdate,
} from "../schemas/posts.schemas";

export type posts = z.infer<typeof postsSchema>;
export type postsRequest = z.infer<typeof postsSchemaRequest>;
export type postsRequestUpdate = z.infer<typeof postsSchemaRequestUpdate>;
export type postResponseArray = z.infer<typeof postsSchemaArray>;

export type postsResponseArrayPaginated = {
  nextUrl: string | null;
  previousUrl: string | null;
  Total: number;
  limit: any;
  offset: any;
  posts: postResponseArray;
};
