import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";

const routes = Router();

export const profileRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/favorite/:id", //activity id
    authStatusMiddleware
    // add/remove activity to favorites controller
  );
  routes.post(
    "/schedule/:id", //activity id
    authStatusMiddleware
    // schema validation middleware
    // schedule activity controller
  );
  routes.get(
    "/schedule",
    authStatusMiddleware
    // list user schedule controller
  );
  routes.get(
    "/history",
    authStatusMiddleware
    // list user activity history controller
  );
  routes.patch(
    "",
    authStatusMiddleware
    // update controller (only bio and phone)
  );
  routes.delete(
    "/schedule/:id", //activity id
    authStatusMiddleware
    // delete activity_schedule controller
  );
  return routes;
};
