import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { addressSchemaRequest } from "../schemas/address.schema";
import { createAddressController } from "../controllers/address.controller";
import { ensureAlreadyHasAddressMiddleware } from "../middlewares/ensureAlreadyHasAddress.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";

export const addressRoutes: Router = Router();

addressRoutes.post(
  "/:uuid",
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(addressSchemaRequest),
  ensureAlreadyHasAddressMiddleware,
  createAddressController
);
