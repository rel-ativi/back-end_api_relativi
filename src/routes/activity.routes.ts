import { Router } from "express";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { proUserStatusMiddleware } from "../middlewares/proUserStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { activitySchema } from "../schemas/activities.schema";

const routes = Router();

export const activityRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware,
    schemaValidationMiddleware(activitySchema)
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/day",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
    // create day controller
  );
  routes.post(
    "/category",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
    // create category controller
  );
  routes.get(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware
    // read (list all activities from that user) controller
  );
  routes.patch(
    "/:id",
    authStatusMiddleware,
    proUserStatusMiddleware
    // update controller
  );
  routes.delete(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware
    // delete controller
  );
  routes.delete(
    "/day/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete day controller
  );
  routes.delete(
    "/category/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete category controller
  );

  return routes;
};
