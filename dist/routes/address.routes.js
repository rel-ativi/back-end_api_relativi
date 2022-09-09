"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoutes = void 0;
const express_1 = require("express");
const admStatus_middleware_1 = require("../middlewares/admStatus.middleware");
const authStatus_middleware_1 = require("../middlewares/authStatus.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const address_schema_1 = require("../schemas/address.schema");
const generic_schema_1 = require("../schemas/generic.schema");
const routes = (0, express_1.Router)();
const addressRoutes = () => {
    routes.post("", authStatus_middleware_1.authStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(address_schema_1.addressSchema)
    // create controller
    );
    routes.post("/district", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameOnlySchema)
    // create controller
    );
    routes.post("/city", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameOnlySchema)
    // create controller
    );
    routes.post("/state", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameOnlySchema)
    // create controller
    );
    routes.post("/country", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware, (0, schemaValidation_middleware_1.schemaValidationMiddleware)(generic_schema_1.nameOnlySchema)
    // create controller
    );
    routes.get("/district", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // list all controller
    );
    routes.get("/city", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // list all controller
    );
    routes.get("/state", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // list all controller
    );
    routes.get("/country", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // list all controller
    );
    routes.patch("/:id", authStatus_middleware_1.authStatusMiddleware
    // update controller
    );
    routes.delete("/:id", authStatus_middleware_1.authStatusMiddleware
    // delete controller
    );
    routes.delete("/district/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete controller
    );
    routes.delete("/city/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete controller
    );
    routes.delete("/state/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete controller
    );
    routes.delete("/country/:id", authStatus_middleware_1.authStatusMiddleware, admStatus_middleware_1.admStatusMiddleware
    // delete controller
    );
    return routes;
};
exports.addressRoutes = addressRoutes;
