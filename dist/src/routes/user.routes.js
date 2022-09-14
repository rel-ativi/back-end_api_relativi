"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const admStatus_middleware_1 = require("../middlewares/admStatus.middleware");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const user_schema_1 = require("../schemas/user.schema");
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("", (0, schemaValidation_middleware_1.schemaValidationMiddleware)(user_schema_1.userSchema), user_controllers_1.createUserController);
    routes.get("", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, user_controllers_1.listUsersController);
    routes.get("/profile", authStatus_middleware_1.authStatusMiddleware, user_controllers_1.listUserController);
    routes.patch("", authStatus_middleware_1.authStatusMiddleware, user_controllers_1.updateUserController);
    routes.delete("", authStatus_middleware_1.authStatusMiddleware, user_controllers_1.deleteUserController);
    return routes;
};
exports.userRoutes = userRoutes;
