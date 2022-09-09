"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const profile_schema_1 = require("../schemas/profile.schema");
const routes = (0, express_1.Router)();
const profileRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(profile_schema_1.profileSchema)
    // create controller
    );
    routes.post("/favorite/:id", //activity id
    authStatus_middleware_1.authStatusMiddleware
    // add/remove activity to favorites controller
    );
    routes.post("/schedule/:id", //activity id
    authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(profile_schema_1.userScheduleSchema)
    // schedule activity controller
    );
    routes.get("/schedule", authStatus_middleware_1.authStatusMiddleware
    // list user schedule controller
    );
    routes.get("/history", authStatus_middleware_1.authStatusMiddleware
    // list user activity history controller
    );
    routes.patch("", authStatus_middleware_1.authStatusMiddleware
    // update controller (only bio and phone)
    );
    routes.delete("/schedule/:id", //activity id
    authStatus_middleware_1.authStatusMiddleware
    // delete activity_schedule controller
    );
    return routes;
};
exports.profileRoutes = profileRoutes;
