import { Router } from "express";

import {
  createPaymentController,
  deletePaymentController,
  updatePaymentController,
} from "../controllers/payment.controllers";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { paymentInfoSchema } from "../schemas/paymentInfo.schema";

const routes = Router();

export const paymentInfoRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(paymentInfoSchema),
    createPaymentController
  );
  routes.patch("", authStatusMiddleware, updatePaymentController);
  routes.delete("", authStatusMiddleware, deletePaymentController);

  return routes;
};
