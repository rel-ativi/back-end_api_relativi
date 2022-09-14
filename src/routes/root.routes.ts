import { Router } from "express";

const routes = Router();

export const rootRoutes = () => {
  routes.get("/", (req, res) => res.send("Welcome to Relativi Back-End API"));

  return routes;
};
