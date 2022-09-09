import { Router } from "express";
import {
  createUserController,
  deleteUserController,
} from "../controllers/user.controllers";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { userSchema } from "../schemas/user.schema";
import listUsersService from "../services/users/listUsers.service";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    // internal use only
    "",
    schemaValidationMiddleware(userSchema),
    createUserController
  );
  routes.get("", authStatusMiddleware, admStatusMiddleware, listUsersService);
  routes.get(
    "/profile",
    authStatusMiddleware
    // read (list the token id user) controller
  );
  routes.patch(
    "",
    authStatusMiddleware
    // update controller
  );
  routes.delete("", authStatusMiddleware, deleteUserController);

  return routes;
};
