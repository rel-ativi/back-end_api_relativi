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
<<<<<<< HEAD
=======
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
>>>>>>> develop
  routes.get(
    "/schedule",
    authStatusMiddleware
    // list user schedule controller
  );
<<<<<<< HEAD

=======
  routes.get(
    "/history",
    authStatusMiddleware
    // list user activity history controller
  );
>>>>>>> develop
  routes.patch(
    "",
    authStatusMiddleware
    // update controller (only bio and phone)
  );
<<<<<<< HEAD
  routes.post(
    "/favorite/:id" //activity id
    // verify auth middleware
    // add/remove user to favorites controller
  );
  routes.get(
    "/history"
    // verify auth middleware
    // list user activity histroy controller
  );
  routes.post(
    "/schedule/:id" //activity id
    // verify auth middleware
    // schema validation middleware
    // schedule activity controller
  );

=======
  routes.delete(
    "/schedule/:id", //activity id
    authStatusMiddleware
    // delete activity_schedule controller
  );
>>>>>>> develop
  return routes;
};
