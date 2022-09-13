import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controllers";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { userSchema } from "../schemas/user.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post("", schemaValidationMiddleware(userSchema), createUserController);
  routes.get("", admStatusMiddleware, listUsersController);
  routes.get("/profile", authStatusMiddleware, listUserController);
  routes.patch("", authStatusMiddleware, updateUserController);
  routes.delete("", authStatusMiddleware, deleteUserController);

  return routes;
};
