import "express-async-errors";
import "reflect-metadata";
const path = require("path");

import express from "express";

import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { appRoutes } from "./routes";

const app = express();
app.use(express.json());

appRoutes(app);
app.use(handleErrorMiddleware);

app.use("/", express.static(path.join(__dirname + "../../docs")));

export default app;
