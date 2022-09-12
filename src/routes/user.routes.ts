import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUserController,
  listUsersController,
} from "../controllers/user.controllers";
import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { userSchema } from "../schemas/user.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    // internal use only
    "",
    schemaValidationMiddleware(userSchema),
    createUserController
  );
  routes.get(
    "",
    authStatusMiddleware,
    admStatusMiddleware,
    listUsersController
  );
  routes.get("/profile", authStatusMiddleware, listUserController);
  routes.patch(
    "",
    authStatusMiddleware
    // update controller
  );
  routes.delete("", authStatusMiddleware, deleteUserController);

  return routes;
};
