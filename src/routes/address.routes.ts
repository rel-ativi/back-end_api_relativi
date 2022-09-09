import { Router } from "express";

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
    schemaValidationMiddleware(addressSchema)
    // create controller
  );
  routes.post(
    "/district",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.post(
    "/city",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.post(
    "/state",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.post(
    "/country",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create controller
  );
  routes.get(
    "/district",
    authStatusMiddleware,
    admStatusMiddleware
    // list all controller
  );
  routes.get(
    "/city",
    authStatusMiddleware,
    admStatusMiddleware
    // list all controller
  );
  routes.get(
    "/state",
    authStatusMiddleware,
    admStatusMiddleware
    // list all controller
  );
  routes.get(
    "/country",
    authStatusMiddleware,
    admStatusMiddleware
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
    "/district/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/city/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/state/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/country/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete controller
  );

  return routes;
};
