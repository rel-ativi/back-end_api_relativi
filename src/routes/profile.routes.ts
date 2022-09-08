import { Router } from "express";

import { createScheduleController } from "../controllers/schedule.controllers";
import { listScheduleController } from "../controllers/schedule.controllers";
import { deleteScheduleController } from "../controllers/schedule.controllers";

const routes = Router();

export const profileRoutes = () => {
  routes.post(
    ""
    // verify auth middleware
    // schema validation middleware
    // create controller
  );
  routes.post(
    "/favorite/:id" //activity id
    // verify auth middleware
    // add/remove user to favorites controller
  );
  routes.post("/schedule/:activityId", createScheduleController);
  routes.get("/schedule", listScheduleController);
  routes.delete("/schedule/:id", deleteScheduleController);

  routes.get(
    "/history"
    // verify auth middleware
    // list user activity histroy controller
  );

  routes.patch(
    ""
    // verify auth middleware
    // update controller (only bio and phone)
  );

  return routes;
};
