import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";
import { loginController } from "../controllers/login.controller";

export const loginRouter: Router = Router();

loginRouter.post("", ensureDataIsValidMiddleware(loginSchema), loginController);
