import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { paymentInfoSchema } from "../schemas/paymentInfo.schema";

const routes = Router();

export const paymentInfoRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(paymentInfoSchema)
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
