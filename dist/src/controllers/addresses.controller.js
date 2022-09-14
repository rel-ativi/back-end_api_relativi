"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountryController = exports.deleteStateController = exports.deleteCityController = exports.deleteDistrictController = exports.addressDeleteController = exports.addressesUpdateController = exports.listCountriesController = exports.listStatesController = exports.listCitiesController = exports.listDistrictsController = exports.listUserAddressesController = exports.listAllAddressesController = exports.countryCreateController = exports.stateCreateController = exports.cityCreateController = exports.districtCreateController = exports.addressesCreateController = void 0;
const class_transformer_1 = require("class-transformer");
const addressesCreate_service_1 = __importDefault(require("../services/addresses/addressesCreate.service"));
const addressesDelete_service_1 = __importDefault(require("../services/addresses/addressesDelete.service"));
const addressesListAll_service_1 = __importDefault(require("../services/addresses/addressesListAll.service"));
const addressesListUser_service_1 = __importDefault(require("../services/addresses/addressesListUser.service"));
const addressesUpdate_service_1 = __importDefault(require("../services/addresses/addressesUpdate.service"));
const cityCreate_service_1 = __importDefault(require("../services/addresses/cityCreate.service"));
const cityDelete_service_1 = __importDefault(require("../services/addresses/cityDelete.service"));
const cityList_service_1 = __importDefault(require("../services/addresses/cityList.service"));
const countryCreate_service_1 = __importDefault(require("../services/addresses/countryCreate.service"));
const countryDelete_service_1 = __importDefault(require("../services/addresses/countryDelete.service"));
const countryList_service_1 = __importDefault(require("../services/addresses/countryList.service"));
const districtCreate_service_1 = __importDefault(require("../services/addresses/districtCreate.service"));
const districtDelete_service_1 = __importDefault(require("../services/addresses/districtDelete.service"));
const districtList_service_1 = __importDefault(require("../services/addresses/districtList.service"));
const stateCreate_service_1 = __importDefault(require("../services/addresses/stateCreate.service"));
const stateDelete_service_1 = __importDefault(require("../services/addresses/stateDelete.service"));
const stateList_service_1 = __importDefault(require("../services/addresses/stateList.service"));
const addressesCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addressData = req.body;
    const profile_id = req.user.profile_id;
    const address = yield (0, addressesCreate_service_1.default)(profile_id, Object.assign({}, addressData));
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(address));
});
exports.addressesCreateController = addressesCreateController;
const districtCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const districtData = req.body;
    const district = yield (0, districtCreate_service_1.default)(Object.assign({}, districtData));
    return res.status(201).json(district);
});
exports.districtCreateController = districtCreateController;
const cityCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityData = req.body;
    const city = yield (0, cityCreate_service_1.default)(Object.assign({}, cityData));
    return res.status(201).json(city);
});
exports.cityCreateController = cityCreateController;
const stateCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stateData = req.body;
    const state = yield (0, stateCreate_service_1.default)(Object.assign({}, stateData));
    return res.status(201).json(state);
});
exports.stateCreateController = stateCreateController;
const countryCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countryData = req.body;
    const coutnry = yield (0, countryCreate_service_1.default)(Object.assign({}, countryData));
    return res.status(201).json(coutnry);
});
exports.countryCreateController = countryCreateController;
const listAllAddressesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adresses = yield (0, addressesListAll_service_1.default)();
    return res.json(adresses);
});
exports.listAllAddressesController = listAllAddressesController;
const listUserAddressesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile_id = req.user.profile_id;
    const activities = yield (0, addressesListUser_service_1.default)(profile_id);
    return res.json(activities);
});
exports.listUserAddressesController = listUserAddressesController;
const listDistrictsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const districts = yield (0, districtList_service_1.default)();
    return res.json(districts);
});
exports.listDistrictsController = listDistrictsController;
const listCitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = yield (0, cityList_service_1.default)();
    return res.json(cities);
});
exports.listCitiesController = listCitiesController;
const listStatesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const states = yield (0, stateList_service_1.default)();
    return res.json(states);
});
exports.listStatesController = listStatesController;
const listCountriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const country = yield (0, countryList_service_1.default)();
    return res.json(country);
});
exports.listCountriesController = listCountriesController;
const addressesUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const profile_id = req.user.profile_id;
    const is_adm = req.user.is_adm;
    const addressData = req.body;
    const updated = yield (0, addressesUpdate_service_1.default)(id, profile_id, is_adm, Object.assign({}, addressData));
    return res.json((0, class_transformer_1.instanceToPlain)(updated));
});
exports.addressesUpdateController = addressesUpdateController;
const addressDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const profile_id = req.user.profile_id;
    const is_adm = req.user.is_adm;
    yield (0, addressesDelete_service_1.default)(id, profile_id, is_adm);
    return res.status(204).send();
});
exports.addressDeleteController = addressDeleteController;
const deleteDistrictController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, districtDelete_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteDistrictController = deleteDistrictController;
const deleteCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, cityDelete_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteCityController = deleteCityController;
const deleteStateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, stateDelete_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteStateController = deleteStateController;
const deleteCountryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, countryDelete_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteCountryController = deleteCountryController;
