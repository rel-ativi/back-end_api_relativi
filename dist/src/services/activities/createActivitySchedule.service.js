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
const days_entity_1 = require("../../entities/days.entity");
const AppError_1 = require("../../errors/AppError");
const createActivityScheduleService = (activity_id, { time, days }) => __awaiter(void 0, void 0, void 0, function* () {
    const activityRepo = data_source_1.default.getRepository(activities_entity_1.Activity);
    const activityScheduleRepo = data_source_1.default.getRepository(activity_schedule_entity_1.ActivitySchedule);
    const daysRepo = data_source_1.default.getRepository(days_entity_1.Day);
    const activities = yield activityRepo.find();
    const allDays = yield daysRepo.find();
    const activity = activities.find((act) => act.id === activity_id);
    if (!activity) {
        throw new AppError_1.AppError("Activity not found", 404);
    }
    const daysArray = [];
    days.forEach((day) => {
        const aDay = allDays.find((d) => d.id === day);
        if (!aDay) {
            throw new AppError_1.AppError("Day not found", 404);
        }
        daysArray.push(aDay);
    });
    const [hour, minutes] = time.split(":");
    if (+hour < 6 || (+hour >= 22 && +minutes > 0)) {
        throw new AppError_1.AppError("Invalid starting time");
    }
    const activity_schedule = new activity_schedule_entity_1.ActivitySchedule();
    activity_schedule.hour = time;
    activity_schedule.days = [...daysArray];
    activityScheduleRepo.create(activity_schedule);
    yield activityScheduleRepo.save(activity_schedule);
    yield activityRepo.update(activity_id, {
        activity_schedule: activity_schedule,
    });
    return activity_schedule;
});
exports.default = createActivityScheduleService;
