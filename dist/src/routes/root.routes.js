"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoutes = void 0;
const express_1 = require("express");
const routes = (0, express_1.Router)();
const rootRoutes = () => {
    routes.get("/", (req, res) => res.send("Welcome to Relativi Back-End API"));
    return routes;
};
exports.rootRoutes = rootRoutes;
