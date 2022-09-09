"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_controllers_1 = require("../controllers/session.controllers");
const routes = (0, express_1.Router)();
const sessionRoutes = () => {
    routes.post("", session_controllers_1.newSessionController);
    return routes;
};
exports.sessionRoutes = sessionRoutes;
