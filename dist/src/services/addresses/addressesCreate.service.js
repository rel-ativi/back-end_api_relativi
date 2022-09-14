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
const addressesCreateService = (profile_id, { street, number, zip_code, district_id, city_id, state_id, country_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const adressesRepo = data_source_1.default.getRepository(addresses_entity_1.Address);
    const districtsRepo = data_source_1.default.getRepository(districts_entity_1.District);
    const citiesRepo = data_source_1.default.getRepository(cities_entity_1.City);
    const statesRepo = data_source_1.default.getRepository(states_entity_1.State);
    const countriesRepo = data_source_1.default.getRepository(countries_entity_1.Country);
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const districts = yield districtsRepo.find();
    const district = districts.find((dis) => dis.id === district_id);
    const city = yield citiesRepo.findOne({ where: { id: city_id } });
    const state = yield statesRepo.findOne({ where: { id: state_id } });
    const country = yield countriesRepo.findOne({
        where: { id: country_id },
    });
    const profile = yield profilesRepo.findOne({
        where: { id: profile_id },
    });
    if (!district) {
        throw new AppError_1.AppError("District not found", 404);
    }
    if (!city) {
        throw new AppError_1.AppError("City not found", 404);
    }
    if (!state) {
        throw new AppError_1.AppError("State not found", 404);
    }
    if (!country) {
        throw new AppError_1.AppError("Country not found", 404);
    }
    const address = new addresses_entity_1.Address();
    address.street = street;
    address.number = number;
    address.zip_code = zip_code;
    address.district = district;
    address.city = city;
    address.state = state;
    address.country = country;
    address.created_by = profile;
    console.log(address);
    adressesRepo.create(address);
    yield adressesRepo.save(address);
    yield profilesRepo.update(profile_id, {
        address: address,
    });
    return address;
});
exports.default = addressesCreateService;
