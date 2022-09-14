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
const categories_entity_1 = require("../../entities/categories.entity");
const AppError_1 = require("../../errors/AppError");
const updateActivityService = (id, { name, price, min_users, max_users, duration, category_id, recurrent, activity_schedule_id, starting_date, }) => __awaiter(void 0, void 0, void 0, function* () {
    const activityRepo = data_source_1.default.getRepository(activities_entity_1.Activity);
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.Category);
    const activityScheduleRepo = data_source_1.default.getRepository(activity_schedule_entity_1.ActivitySchedule);
    const activities = yield activityRepo.find();
    const categories = yield categoryRepo.find();
    const schedules = yield activityScheduleRepo.find();
    const toUpdate = activities.find((act) => act.id === id);
    const newCategory = categories.find((cat) => cat.id === category_id);
    const schedule = schedules.find((sch) => sch.id === activity_schedule_id);
    if (!toUpdate) {
        throw new AppError_1.AppError("Activity not found", 404);
    }
    if (!newCategory) {
        throw new AppError_1.AppError("Category not found", 404);
    }
    yield activityRepo.update(id, {
        name: name || toUpdate.name,
        price: price || toUpdate.price,
        min_users: min_users || toUpdate.min_users,
        max_users: max_users || toUpdate.max_users,
        duration: duration || toUpdate.duration,
        category: newCategory || toUpdate.category,
        recurrent: recurrent || toUpdate.recurrent,
        activity_schedule: schedule || toUpdate.activity_schedule,
        starting_date: starting_date || toUpdate.starting_date,
    });
    const updated = yield activityRepo.findOneBy({
        id,
    });
    return updated;
});
exports.default = updateActivityService;
