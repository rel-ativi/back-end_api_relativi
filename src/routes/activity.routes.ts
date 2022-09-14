import { Router } from "express";

import {
  createActivityController,
  createActivityScheduleController,
  createCategoryController,
  createDayController,
  deleteActivityController,
  deleteActivityScheduleController,
  deleteCategoryController,
  deleteDayController,
  listAllActivitiesController,
  listCategoriesController,
  listDaysController,
  listUserActivitiesController,
  updateActivityController,
  updateActivityScheduleController,
} from "../controllers/activity.controllers";
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
    "/:id/schedule", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware,
    schemaValidationMiddleware(activityScheduleSchema),
    createActivityScheduleController
  );
  routes.post(
    "/day",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameNumberSchema),
    createDayController
  );
  routes.post(
    "/category",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    createCategoryController
  );
  routes.get(
    "",
    authStatusMiddleware,
    proUserStatusMiddleware,
    listUserActivitiesController
  );
  routes.get("/all", authStatusMiddleware, listAllActivitiesController);
  routes.get(
    "/days",
    authStatusMiddleware,
    proUserStatusMiddleware,
    listDaysController
  );
  routes.get(
    "/categories",
    authStatusMiddleware,
    proUserStatusMiddleware,
    listCategoriesController
  );
  routes.patch(
    "/:id", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware,
    updateActivityController
  );
  routes.patch(
    "/schedule/:id", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware,
    updateActivityScheduleController
  );
  routes.delete(
    "/:id", // activity id
    authStatusMiddleware,
    proUserStatusMiddleware,
    deleteActivityController
  );
  routes.delete(
    "/schedules/:id", // activity_schedule id
    authStatusMiddleware,
    proUserStatusMiddleware,
    deleteActivityScheduleController
  );
  routes.delete(
    "/days/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteDayController
  );
  routes.delete(
    "/categories/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteCategoryController
  );

  return routes;
};
