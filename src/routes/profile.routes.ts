import { Router } from "express";

import { createScheduleController } from "../controllers/schedule.controllers";

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
  routes.get(
    "/schedule"
    // verify auth middleware
    // list user schedule controller
  );
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
