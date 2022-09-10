import { Router } from "express";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { proUserStatusMiddleware } from "../middlewares/proUserStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { bankInfoSchema } from "../schemas/bankInfo.schema";

import { createBankController } from "../controllers/bank.controller";
import { updateBankController } from "../controllers/bank.controller";
import { deleteBankController } from "../controllers/bank.controller";

const routes = Router();

export const bankInfoRoutes = () => {
  routes.post(
    "",
    // authStatusMiddleware,
    // proUserStatusMiddleware,
    schemaValidationMiddleware(bankInfoSchema),
    createBankController
  );
  routes.patch(
    "",
    // authStatusMiddleware,
    // proUserStatusMiddleware
    updateBankController
  );
  routes.delete(
    "",
    // authStatusMiddleware
    // delete controller
    deleteBankController
  );

  return routes;
};
