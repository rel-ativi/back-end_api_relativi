import { Router } from "express";
import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";

const routes = Router();

export const addressRoutes = () => {
  routes.post(
    ""
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/district",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/city",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/state",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/country",
    authStatusMiddleware,
    admStatusMiddleware
    // schema validation middleware
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
