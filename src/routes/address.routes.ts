import { Router } from "express";

import {
  addressDeleteController,
  addressesCreateController,
  addressesUpdateController,
  cityCreateController,
  countryCreateController,
  deleteCityController,
  deleteCountryController,
  deleteDistrictController,
  deleteStateController,
  districtCreateController,
  listAllAddressesController,
  listCitiesController,
  listCountriesController,
  listDistrictsController,
  listStatesController,
  listUserAddressesController,
  stateCreateController,
} from "../controllers/addresses.controller";

import { admStatusMiddleware } from "../middlewares/admStatus.middleware";
import { authStatusMiddleware } from "../middlewares/authStatus.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { addressSchema } from "../schemas/address.schema";
import { nameOnlySchema } from "../schemas/generic.schema";

const routes = Router();

export const addressRoutes = () => {
  routes.post(
    "",
    authStatusMiddleware,
    schemaValidationMiddleware(addressSchema),
    addressesCreateController
  );
  routes.post(
    "/districts",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    districtCreateController
  );
  routes.post(
    "/cities",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    cityCreateController
  );
  routes.post(
    "/states",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    stateCreateController
  );
  routes.post(
    "/countries",
    authStatusMiddleware,
    admStatusMiddleware,
    schemaValidationMiddleware(nameOnlySchema),
    countryCreateController
  );
  routes.get("", authStatusMiddleware, listUserAddressesController);
  routes.get(
    "/all",
    admStatusMiddleware,
    authStatusMiddleware,
    listAllAddressesController
  );
  routes.get("/districts", authStatusMiddleware, listDistrictsController);
  routes.get("/cities", authStatusMiddleware, listCitiesController);
  routes.get("/states", authStatusMiddleware, listStatesController);
  routes.get("/countries", authStatusMiddleware, listCountriesController);
  routes.patch("/:id", authStatusMiddleware, addressesUpdateController);
  routes.delete("/:id", authStatusMiddleware, addressDeleteController);
  routes.delete(
    "/districts/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteDistrictController
  );
  routes.delete(
    "/cities/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteCityController
  );
  routes.delete(
    "/states/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteStateController
  );
  routes.delete(
    "/countries/:id",
    authStatusMiddleware,
    admStatusMiddleware,
    deleteCountryController
  );

  return routes;
};
