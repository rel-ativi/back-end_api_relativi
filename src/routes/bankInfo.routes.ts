import { Router } from "express";

const routes = Router();

export const bankInfoRoutes = () => {
  routes.post(
    ""
    // verify auth middleware
    // verify pro-user status middleware
    // schema validation middleware
    // create controller
  );
  routes.patch(
    ""
    // verify auth middleware
    // verify pro-user status middleware
    // update controller
  );
  routes.delete(
    ""
    // verify auth middleware
    // delete controller
  );

  return routes;
};
