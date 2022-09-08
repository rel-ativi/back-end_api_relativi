import { Router } from "express";

import { newSessionController } from "../controllers/session.controllers";

const routes = Router();

export const sessionRoutes = () => {
  routes.post("", newSessionController);

  return routes;
};
