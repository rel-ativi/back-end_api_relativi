import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";

const routes = Router();

export const paymentInfoRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.patch(
    "",
    authStatusMiddleware
    // update controller
  );
  routes.delete(
    "",
    authStatusMiddleware
    // delete controller
  );

  return routes;
};
