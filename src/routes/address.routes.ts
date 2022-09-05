import { Router } from "express";

const routes = Router();

export const addressRoutes = () => {
  routes.post(
    ""
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/district"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/city"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/state"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/country"
    // verify auth middleware
    // verify adm status middleware
    // schema validation middleware
    // create controller
  );
  routes.get(
    "/district"
    // verify auth middleware
    // verify adm status middleware
    // list all controller
  );
  routes.get(
    "/city"
    // verify auth middleware
    // verify adm status middleware
    // list all controller
  );
  routes.get(
    "/state"
    // verify auth middleware
    // verify adm status middleware
    // list all controller
  );
  routes.get(
    "/country"
    // verify auth middleware
    // verify adm status middleware
    // list all controller
  );
  routes.patch(
    "/:id"
    // verify auth middleware
    // update controller
  );
  routes.delete(
    "/:id"
    // verify auth middleware
    // delete controller
  );
  routes.delete(
    "/district/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete controller
  );
  routes.delete(
    "/city/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete controller
  );
  routes.delete(
    "/state/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete controller
  );
  routes.delete(
    "/country/:id"
    // verify auth middleware
    // verify adm status middleware
    // delete controller
  );

  return routes;
};
