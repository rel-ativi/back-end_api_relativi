import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { proUserStatusMiddleware } from "../middlewares/proUserStatus.middleware";

const routes = Router();

export const bankInfoRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.patch(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware
    // update controller
  );
  routes.delete(
    "",
    authStatusMiddleware
    // delete controller
  );

  return routes;
};
