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
const data_source_1 = __importDefault(require("../../data-source"));
const addresses_entity_1 = require("../../entities/addresses.entity");
const cities_entity_1 = require("../../entities/cities.entity");
const countries_entity_1 = require("../../entities/countries.entity");
const districts_entity_1 = require("../../entities/districts.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const states_entity_1 = require("../../entities/states.entity");
const AppError_1 = require("../../errors/AppError");
const addressesUpdateService = (id, profile_id, is_adm, { street, number, zip_code, district_id, city_id, state_id, country_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const addressesRepo = data_source_1.default.getRepository(addresses_entity_1.Address);
    const citiesRepo = data_source_1.default.getRepository(cities_entity_1.City);
    const countriesRepo = data_source_1.default.getRepository(countries_entity_1.Country);
    const districtsRepo = data_source_1.default.getRepository(districts_entity_1.District);
    const statesRepo = data_source_1.default.getRepository(states_entity_1.State);
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const addresses = yield addressesRepo.find();
    const districts = yield districtsRepo.find();
    const toUpdate = addresses.find((add) => add.id === id);
    const district = districts.find((dis) => dis.id === district_id);
    const city = yield citiesRepo.findOne({ where: { id: city_id } });
    const state = yield statesRepo.findOne({ where: { id: state_id } });
    const country = yield countriesRepo.findOne({
        where: { id: country_id },
    });
    const profile = yield profilesRepo.findOne({
        where: { id: profile_id },
    });
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    if (!toUpdate) {
        throw new AppError_1.AppError("Address not found", 404);
    }
    if (!!district && !district) {
        throw new AppError_1.AppError("District not found", 404);
    }
    if (!!city_id && !city) {
        throw new AppError_1.AppError("City not found", 404);
    }
    if (!!state_id && !state) {
        throw new AppError_1.AppError("State not found", 404);
    }
    if (!!country_id && !country) {
        throw new AppError_1.AppError("Country not found", 404);
    }
    let is_owner = false;
    profile.addresses.forEach((add) => {
        if (add.id === toUpdate.id)
            is_owner = true;
    });
    if (!is_owner && !is_adm) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    yield addressesRepo.update(id, {
        street: street || toUpdate.street,
        number: number || toUpdate.number,
        zip_code: zip_code || toUpdate.zip_code,
        district: district || toUpdate.district,
        city: city || toUpdate.city,
        state: state || toUpdate.state,
        country: country || toUpdate.country,
    });
    const updated = yield addressesRepo.findOneBy({ id });
    return updated;
});
exports.default = addressesUpdateService;
