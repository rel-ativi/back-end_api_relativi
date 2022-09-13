import { Router } from "express";
import {
  addressesCreateController,
  districtCreateController,
} from "../controllers/addresses.controller";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { addressSchema } from "../schemas/address.schema";
import { nameOnlySchema } from "../schemas/generic.schema";

const routes = Router();

export const addressRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(addressSchema),
    addressesCreateController
  );
  routes.post(
    "/districst",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    districtCreateController
  );
  routes.post(
    "/cities",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.post(
    "/states",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.post(
    "/countries",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.get(
    "/districts",
    authStatusMiddleware
    // list all controller
  );
  routes.get(
    "/cities",
    authStatusMiddleware
    // list all controller
  );
  routes.get(
    "/states",
    authStatusMiddleware
    // list all controller
  );
  routes.get(
    "/countries",
    authStatusMiddleware
    // list all controller
  );
  routes.patch(
    "/:id",
    authStatusMiddleware
    // update controller
  );
  routes.delete(
    "/:id",
    authStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/districts/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/cities/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/states/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/countries/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );

  return routes;
};
