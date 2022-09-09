"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRoutes = void 0;
const express_1 = require("express");
const admStatus_middleware_1 = require("../middlewares/admStatus.middleware");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const proUserStatus_middleware_1 = require("../middlewares/proUserStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const activities_schema_1 = require("../schemas/activities.schema");
const routes = (0, express_1.Router)();
const activityRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(activities_schema_1.activitySchema)
    // schema validation middleware
    // create controller
    );
    routes.post("/day", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // schema validation middleware
    // create day controller
    );
    routes.post("/category", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // schema validation middleware
    // create category controller
    );
    routes.get("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware
    // read (list all activities from that user) controller
    );
    routes.patch("/:id", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware
    // update controller
    );
    routes.delete("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware
    // delete controller
    );
    routes.delete("/day/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete day controller
    );
    routes.delete("/category/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete category controller
    );
    return routes;
};
exports.activityRoutes = activityRoutes;
