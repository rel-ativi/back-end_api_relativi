import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { paymentInfoSchema } from "../schemas/paymentInfo.schema";

import { createPaymentController } from "../controllers/payment.controllers";
import { updatePaymentController } from "../controllers/payment.controllers";
import { deletePaymentController } from "../controllers/payment.controllers";

const routes = Router();

export const paymentInfoRoutes = () => {
  routes.post(
    "",
    // authStatusMiddleware,
    schemaValidationMiddleware(paymentInfoSchema),
    createPaymentController

    // create controller
  );
  routes.patch(
    "",
    // authStatusMiddleware
    // update controller
    updatePaymentController
  );
  routes.delete(
    "",
    // authStatusMiddleware
    // delete controller
    deletePaymentController
  );

  return routes;
};
