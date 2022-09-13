import { Router } from "express";
import {
  profilesAddFavoritesController,
  profilesListFavoritesController,
  profilesUpdateController,
} from "../controllers/profiles.controllers";

import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { profileSchema, userScheduleSchema } from "../schemas/profile.schema";

const routes = Router();

export const profileRoutes = () => {
  routes.post(
    // internal use
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(profileSchema)
    // create controller
  );
  routes.post(
    "/favorites/:id",
    authStatusMiddleware,
    profilesAddFavoritesController
  );
  routes.post(
    "/schedules/:id", //activity id
    authStatusMiddleware,
    schemaValidationMiddleware(userScheduleSchema)
    // schedule activity controller
  );
  routes.get(
    "/favorites",
    authStatusMiddleware,
    profilesListFavoritesController
  );
  routes.get(
    "/schedules",
    authStatusMiddleware
    // list user schedule controller
  );
  routes.get(
    "/history",
    authStatusMiddleware
    // list user activity history controller
  );
  routes.patch("", authStatusMiddleware, profilesUpdateController);
  routes.delete(
    "/schedules/:id", //activity id
    authStatusMiddleware
    // delete activity_schedule controller
  );
  return routes;
};
