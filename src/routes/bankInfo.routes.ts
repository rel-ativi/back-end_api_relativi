import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { proUserStatusMiddleware } from "../middlewares/proUserStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { bankInfoSchema } from "../schemas/bankInfo.schema";

const routes = Router();

export const bankInfoRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware,
    schemaValidationMiddleware(bankInfoSchema)
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
