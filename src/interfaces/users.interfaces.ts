import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/user.schema";

export type users = z.infer<typeof userSchema>;
export type usersRequest = z.infer<typeof userSchemaRequest>;
export type usersResponse = z.infer<typeof userSchemaResponse>;
