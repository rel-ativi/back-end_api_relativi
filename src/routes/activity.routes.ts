import { Router } from "express";

const routes = Router();

export const activityRoutes = () => {
  routes.post(
    ""
    // verify auth middleware
    // verify pro_user status middleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/day"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create day controller
  );
  routes.post(
    "/category"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create category controller
  );
  routes.get(
    ""
    // verify auth middleware
    // verify pro_user status middleware
    // read (list all activities from that user) controller
  );
  routes.patch(
    "/:id"
    // verify auth middleware
    // verify pro_user status middleware
    // update controller
  );
  routes.delete(
    ""
    // verify auth middleware
    // verify pro_user status middleware
    // delete controller
  );
  routes.delete(
    "/day/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete day controller
  );
  routes.delete(
    "/category/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete category controller
  );

  return routes;
};
