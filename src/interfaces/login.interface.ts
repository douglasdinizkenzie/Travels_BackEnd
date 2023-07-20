import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type login = z.infer<typeof loginSchema>;
