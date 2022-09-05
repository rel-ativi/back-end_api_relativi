import { Router } from "express";

const routes = Router();

export const paymentInfoRoutes = () => {
  routes.post(
    ""
    // verify auth middleware
    // schema validation middleware
    // create controller
  );
  routes.patch(
    ""
    // verify auth middleware
    // update controller
  );
  routes.delete(
    ""
    // verify auth middleware
    // delete controller
  );

  return routes;
};
