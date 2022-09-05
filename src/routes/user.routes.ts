import { Router } from "express";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    ""
    // schema validation middleware
    // create controller
  );
  routes.get(
    ""
    // verify auth middleware
    // verify adm status middleware
    // read (list all users) controller
  );
  routes.patch(
    ""
    // verify auth middleware
    // update controller
  );
  routes.delete(
    ""
    // verify auth middleware
    // soft-delete controller
  );

  return routes;
};
