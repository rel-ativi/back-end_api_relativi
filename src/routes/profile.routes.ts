import { Router } from "express";

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
    "/favorites/:id", //activity id
    authStatusMiddleware
    // add/remove activity to favorites controller
  );
  routes.post(
    "/schedules/:id", //activity id
    authStatusMiddleware,
    schemaValidationMiddleware(userScheduleSchema)
    // schedule activity controller
  );
  routes.get(
    "/favorites",
    authStatusMiddleware
  )
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
  routes.patch(
    "",
    authStatusMiddleware
    // update controller (only bio and phone)
  );
  routes.delete(
    "/schedules/:id", //activity id
    authStatusMiddleware
    // delete activity_schedule controller
  );
  return routes;
};
