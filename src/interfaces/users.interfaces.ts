import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaResponseArray,
  userSchemaUpdate,
} from "../schemas/user.schema";

export type users = z.infer<typeof userSchema>;
export type usersRequest = z.infer<typeof userSchemaRequest>;
export type usersResponse = z.infer<typeof userSchemaResponse>;
export type usersRequestUpdate = z.infer<typeof userSchemaUpdate>;
export type usersResponseArray = z.infer<typeof userSchemaResponseArray>;

export type usersResponsePaginated = {
  nextUrl: string | null;
  previousUrl: string | null;
  limit: any;
  offset: any;
  total: number;
  users: usersResponseArray;
};
