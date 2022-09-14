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
const user_schedule_entity_1 = require("../../entities/user_schedule.entity");
const activities_entity_1 = require("../../entities/activities.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const createScheduleService = (id, profile_id, { date }) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.default.getRepository(user_schedule_entity_1.UserSchedule);
    const activityReository = data_source_1.default.getRepository(activities_entity_1.Activity);
    const profileRepository = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profileRepository.find();
    const profile = profiles.find((prof) => prof.id === profile_id);
    if (!profile) {
        throw new AppError_1.AppError("user not found", 404);
    }
    const activities = yield activityReository.find();
    const activity = activities.find((act) => act.id === id);
    if (!activity) {
        throw new AppError_1.AppError("Activity not found", 404);
    }
    const requiredDate = new Date(date);
    const initialDate = new Date(activity.starting_date);
    if (requiredDate < initialDate) {
        throw new AppError_1.AppError("Unavailable date");
    }
    if (activity.recurrent && !!activity.activity_schedule) {
        const avilableDays = activity.activity_schedule.days.map((day) => day.number);
        if (!avilableDays.includes(requiredDate.getDay())) {
            throw new AppError_1.AppError("Choose another date");
        }
    }
    const schedule = new user_schedule_entity_1.UserSchedule();
    schedule.date = date;
    schedule.hour = activity.activity_schedule.hour;
    schedule.profile = profile;
    schedule.activity = activity;
    scheduleRepository.create(schedule);
    yield scheduleRepository.save(schedule);
    return schedule;
});
exports.default = createScheduleService;
