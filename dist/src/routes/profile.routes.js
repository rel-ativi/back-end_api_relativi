"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const profiles_controllers_1 = require("../controllers/profiles.controllers");
const schedule_controllers_1 = require("../controllers/schedule.controllers");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const profile_schema_1 = require("../schemas/profile.schema");
const routes = (0, express_1.Router)();
const profileRoutes = () => {
    routes.post(
    // internal use
    "", authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(profile_schema_1.profileSchema)
    // create controller
    );
    routes.post("/favorites/:id", authStatus_middleware_1.authStatusMiddleware, profiles_controllers_1.profilesAddFavoritesController);
    routes.post("/schedules/:id", //activity id
    authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(profile_schema_1.userScheduleSchema), schedule_controllers_1.createScheduleController);
    routes.get("/favorites", authStatus_middleware_1.authStatusMiddleware, profiles_controllers_1.profilesListFavoritesController);
    routes.get("/schedules", authStatus_middleware_1.authStatusMiddleware, schedule_controllers_1.listScheduleController);
    routes.get("/history", authStatus_middleware_1.authStatusMiddleware
    // list user activity history controller
    );
    routes.patch("", authStatus_middleware_1.authStatusMiddleware, profiles_controllers_1.profilesUpdateController);
    routes.delete("/schedules/:id", //activity id
    authStatus_middleware_1.authStatusMiddleware, schedule_controllers_1.deleteScheduleController);
    return routes;
};
exports.profileRoutes = profileRoutes;
