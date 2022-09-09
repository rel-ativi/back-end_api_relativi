"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankInfoRoutes = void 0;
const express_1 = require("express");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const proUserStatus_middleware_1 = require("../middlewares/proUserStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const bankInfo_schema_1 = require("../schemas/bankInfo.schema");
const routes = (0, express_1.Router)();
const bankInfoRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(bankInfo_schema_1.bankInfoSchema)
    // create controller
    );
    routes.patch("", authStatus_middleware_1.authStatusMiddleware, proUserStatus_middleware_1.proUserStatusMiddleware
    // update controller
    );
    routes.delete("", authStatus_middleware_1.authStatusMiddleware
    // delete controller
    );
    return routes;
};
exports.bankInfoRoutes = bankInfoRoutes;
