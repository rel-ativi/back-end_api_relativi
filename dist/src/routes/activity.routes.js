"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRoutes = void 0;
const express_1 = require("express");
const activity_controllers_1 = require("../controllers/activity.controllers");
const admStatus_middleware_1 = require("../middlewares/admStatus.middleware");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const proUserStatus_middleware_1 = require("../middlewares/proUserStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const activities_schema_1 = require("../schemas/activities.schema");
const generic_schema_1 = require("../schemas/generic.schema");
const routes = (0, express_1.Router)();
const activityRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(activities_schema_1.activitySchema), activity_controllers_1.createActivityController);
    routes.post("/:id/schedule", // activity id
    authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(activities_schema_1.activityScheduleSchema), activity_controllers_1.createActivityScheduleController);
    routes.post("/day", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameNumberSchema), activity_controllers_1.createDayController);
    routes.post("/category", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameOnlySchema), activity_controllers_1.createCategoryController);
    routes.get("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.listUserActivitiesController);
    routes.get("/all", authStatus_middleware_1.authStatusMiddleware, activity_controllers_1.listAllActivitiesController);
    routes.get("/days", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.listDaysController);
    routes.get("/categories", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.listCategoriesController);
    routes.patch("/:id", // activity id
    authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.updateActivityController);
    routes.patch("/schedule/:id", // activity id
    authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.updateActivityScheduleController);
    routes.delete("/:id", // activity id
    authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.deleteActivityController);
    routes.delete("/schedules/:id", // activity_schedule id
    authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, activity_controllers_1.deleteActivityScheduleController);
    routes.delete("/days/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, activity_controllers_1.deleteDayController);
    routes.delete("/categories/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, activity_controllers_1.deleteCategoryController);
    return routes;
};
exports.activityRoutes = activityRoutes;
