"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentInfoRoutes = void 0;
const express_1 = require("express");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const paymentInfo_schema_1 = require("../schemas/paymentInfo.schema");
const routes = (0, express_1.Router)();
const paymentInfoRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(paymentInfo_schema_1.paymentInfoSchema)
    // create controller
    );
    routes.patch("", authStatus_middleware_1.authStatusMiddleware
    // update controller
    );
    routes.delete("", authStatus_middleware_1.authStatusMiddleware
    // delete controller
    );
    return routes;
};
exports.paymentInfoRoutes = paymentInfoRoutes;
