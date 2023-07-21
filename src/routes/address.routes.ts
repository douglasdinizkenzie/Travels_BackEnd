import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { addressSchemaRequest } from "../schemas/address.schema";
import { createAddressController } from "../controllers/address.controller";
import { ensureAlreadyHasAddressMiddleware } from "../middlewares/ensureAlreadyHasAddress.middleware";

export const addressRoutes: Router = Router();

addressRoutes.post(
  "/:id",
  ensureDataIsValidMiddleware(addressSchemaRequest),
  ensureAlreadyHasAddressMiddleware,
  createAddressController
);
