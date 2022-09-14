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
const activities_entity_1 = require("../../entities/activities.entity");
const activity_schedule_entity_1 = require("../../entities/activity_schedule.entity");
const addresses_entity_1 = require("../../entities/addresses.entity");
const categories_entity_1 = require("../../entities/categories.entity");
const cities_entity_1 = require("../../entities/cities.entity");
const countries_entity_1 = require("../../entities/countries.entity");
const districts_entity_1 = require("../../entities/districts.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const states_entity_1 = require("../../entities/states.entity");
const AppError_1 = require("../../errors/AppError");
const createActivityService = (profile_id, { name, price, min_users, max_users, duration, category_id, address, recurrent, activity_schedule_id, starting_date, }) => __awaiter(void 0, void 0, void 0, function* () {
    const activityRepo = data_source_1.default.getRepository(activities_entity_1.Activity);
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.Category);
    const addressRepo = data_source_1.default.getRepository(addresses_entity_1.Address);
    const districtsRepo = data_source_1.default.getRepository(districts_entity_1.District);
    const citiesRepo = data_source_1.default.getRepository(cities_entity_1.City);
    const statesRepo = data_source_1.default.getRepository(states_entity_1.State);
    const countriesRepo = data_source_1.default.getRepository(countries_entity_1.Country);
    const profileRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const activityScheduleRepo = data_source_1.default.getRepository(activity_schedule_entity_1.ActivitySchedule);
    const districts = yield districtsRepo.find();
    const category = yield categoryRepo.findOne({
        where: { id: category_id },
    });
    const profile = yield profileRepo.findOne({
        where: { id: profile_id },
    });
    const district = districts.find((dis) => dis.id === address.district_id);
    const city = yield citiesRepo.findOne({
        where: { id: address.city_id },
    });
    const state = yield statesRepo.findOne({
        where: { id: address.state_id },
    });
    const country = yield countriesRepo.findOne({
        where: { id: address.country_id },
    });
    if (!category) {
        throw new AppError_1.AppError("Category not found", 404);
    }
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
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
    const addresses = yield addressRepo.find();
    const schedules = yield activityScheduleRepo.find();
    const activityAlreadyExists = profile.activities.find((act) => act.name === name);
    if (activityAlreadyExists) {
        throw new AppError_1.AppError("Activity name already used");
    }
    const addressAlreadyExists = addresses.find((adrs) => adrs.street === address.street && adrs.number === address.number);
    let newAddress;
    if (!addressAlreadyExists) {
        newAddress = addressRepo.create({
            street: address.street,
            number: address.number,
            zip_code: address.zip_code,
            district: district,
            city: city,
            state: state,
            country: country,
        });
        yield addressRepo.save(newAddress);
    }
    const starting = new Date(starting_date);
    const now = new Date(Date.now());
    if (starting < now) {
        throw new AppError_1.AppError("Invalid starting date");
    }
    const schedule = schedules.find((sch) => sch.id === activity_schedule_id);
    const activity = new activities_entity_1.Activity();
    activity.name = name;
    activity.price = price;
    activity.max_users = max_users;
    activity.duration = duration;
    activity.category = category;
    activity.recurrent = recurrent;
    activity.starting_date = starting_date;
    activity.address = addressAlreadyExists || newAddress;
    activity.created_by = profile;
    if (min_users)
        activity.min_users = min_users;
    if (schedule)
        activity.activity_schedule = schedule;
    activityRepo.create(activity);
    yield activityRepo.save(activity);
    return activity;
});
exports.default = createActivityService;
