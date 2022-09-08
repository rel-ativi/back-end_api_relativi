import { Router } from "express";

import { createScheduleController } from "../controllers/schedule.controllers";
import { listScheduleController } from "../controllers/schedule.controllers";
import { deleteScheduleController } from "../controllers/schedule.controllers";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { profileSchema, userScheduleSchema } from "../schemas/profile.schema";

const routes = Router();

export const profileRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(profileSchema)
    // create controller
  );
  routes.post(
    "/favorite/:id", //activity id
    authStatusMiddleware
    // add/remove activity to favorites controller
  );

  routes.post(
    "/schedule/:activityId",
    authStatusMiddleware,
    schemaValidationMiddleware(userScheduleSchema),
    createScheduleController
  );
  routes.get("/schedule", listScheduleController);
  routes.delete("/schedule/:id", deleteScheduleController);

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
    "/schedule/:id", //activity id
    authStatusMiddleware
    // delete activity_schedule controller
  );
  return routes;
};
