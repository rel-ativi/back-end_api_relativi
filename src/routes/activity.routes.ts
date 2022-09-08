import { Router } from "express";
import { createActivityController } from "../controllers/activity.controllers";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { proUserStatusMiddleware } from "../middlewares/proUserStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import {
  activityScheduleSchema,
  activitySchema,
} from "../schemas/activities.schema";
import { nameNumberSchema, nameOnlySchema } from "../schemas/generic.schema";

const routes = Router();

export const activityRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware,
    schemaValidationMiddleware(activitySchema),
    createActivityController
  );
  routes.post(
    "/schedule",
    authStatusMiddleware,
    proUserStatusMiddleware,
    schemaValidationMiddleware(activityScheduleSchema)
    // create schedule controller
  );
  routes.post(
    "/day",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameNumberSchema)
    // create day controller
  );
  routes.post(
    "/category",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema)
    // create category controller
  );
  routes.get(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware
    // read (list all activities from that user) controller
  );
  routes.get(
    "/schedule",
    authStatusMiddleware,
    proUserStatusMiddleware
    // read (list all schedules from that activity) controller
  );
  routes.patch(
    "/:id", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware
    // update activity controller
  );
  routes.patch(
    "/schedule/:id", // schedule id
    authStatusMiddleware,
    proUserStatusMiddleware
    // update activity_schedule controller
  );
  routes.delete(
    "/:id", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware
    // delete activity controller
  );
  routes.delete(
    "/schedule/:id", // activity_schedule id
    authStatusMiddleware,
    proUserStatusMiddleware
    // delete activity_schedule controller
  );
  routes.delete(
    "/day/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete day controller
  );
  routes.delete(
    "/category/:id",
    authStatusMiddleware,
    admStatusMiddleware
    // delete category controller
  );

  return routes;
};
