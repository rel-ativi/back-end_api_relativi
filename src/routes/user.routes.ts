import { Router } from "express";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { userSchema } from "../schemas/user.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    // internal use only
    "",
    schemaValidationMiddleware(userSchema)
    // create controller
  );
  routes.get(
    "",
    authStatusMiddleware,
    admStatusMiddleware
    // read (list all users) controller
  );
  routes.get(
    "/profile",
    authStatusMiddleware
    // read (list the token id user) controller
  );
  routes.patch(
    "",
    authStatusMiddleware
    // update controller
  );
  routes.delete(
    "",
    authStatusMiddleware
    // soft-delete controller
  );

  return routes;
};
