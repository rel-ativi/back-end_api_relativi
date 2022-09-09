"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const admStatus_middleware_1 = require("../middlewares/admStatus.middleware");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const user_schema_1 = require("../schemas/user.schema");
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post(
    // internal use only
    "", (0, schemaValidation_middleware_1.schemaValidationMiddleware)(user_schema_1.userSchema)
    // create controller
    );
    routes.get("", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // read (list all users) controller
    );
    routes.get("/profile", authStatus_middleware_1.authStatusMiddleware
    // read (list the token id user) controller
    );
    routes.patch("", authStatus_middleware_1.authStatusMiddleware
    // update controller
    );
    routes.delete("", authStatus_middleware_1.authStatusMiddleware
    // soft-delete controller
    );
    return routes;
};
exports.userRoutes = userRoutes;
