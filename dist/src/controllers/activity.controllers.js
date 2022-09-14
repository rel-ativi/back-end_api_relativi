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
exports.deleteCategoryController = exports.deleteDayController = exports.deleteActivityScheduleController = exports.deleteActivityController = exports.updateActivityScheduleController = exports.updateActivityController = exports.listCategoriesController = exports.listDaysController = exports.listUserActivitiesController = exports.listAllActivitiesController = exports.createCategoryController = exports.createDayController = exports.createActivityScheduleController = exports.createActivityController = void 0;
const class_transformer_1 = require("class-transformer");
const createActivity_service_1 = __importDefault(require("../services/activities/createActivity.service"));
const createActivitySchedule_service_1 = __importDefault(require("../services/activities/createActivitySchedule.service"));
const createCategory_service_1 = __importDefault(require("../services/activities/createCategory.service"));
const createDay_service_1 = __importDefault(require("../services/activities/createDay.service"));
const deleteActivity_service_1 = __importDefault(require("../services/activities/deleteActivity.service"));
const deleteActivitySchedule_service_1 = __importDefault(require("../services/activities/deleteActivitySchedule.service"));
const deleteCategory_service_1 = __importDefault(require("../services/activities/deleteCategory.service"));
const deleteDay_service_1 = __importDefault(require("../services/activities/deleteDay.service"));
const listAllActivities_service_1 = __importDefault(require("../services/activities/listAllActivities.service"));
const listCategories_service_1 = __importDefault(require("../services/activities/listCategories.service"));
const listDays_service_1 = __importDefault(require("../services/activities/listDays.service"));
const listUserActivities_service_1 = __importDefault(require("../services/activities/listUserActivities.service"));
const updateActivity_service_1 = __importDefault(require("../services/activities/updateActivity.service"));
const updateActivitySchedule_service_1 = __importDefault(require("../services/activities/updateActivitySchedule.service"));
const createActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityData = req.body;
    const profile_id = req.user.profile_id;
    const activity = yield (0, createActivity_service_1.default)(profile_id, Object.assign({}, activityData));
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(activity));
});
exports.createActivityController = createActivityController;
const createActivityScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityScheduleData = req.body;
    const activity = req.params;
    const schedule = yield (0, createActivitySchedule_service_1.default)(activity.id, Object.assign({}, activityScheduleData));
    return res.status(201).json(schedule);
});
exports.createActivityScheduleController = createActivityScheduleController;
const createDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dayData = req.body;
    const day = yield (0, createDay_service_1.default)(Object.assign({}, dayData));
    return res.status(201).json(day);
});
exports.createDayController = createDayController;
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const category = yield (0, createCategory_service_1.default)(Object.assign({}, categoryData));
    return res.status(201).json(category);
});
exports.createCategoryController = createCategoryController;
const listAllActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activities = yield (0, listAllActivities_service_1.default)();
    return res.json(activities);
});
exports.listAllActivitiesController = listAllActivitiesController;
const listUserActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile_id = req.user.profile_id;
    const activities = yield (0, listUserActivities_service_1.default)(profile_id);
    return res.json(activities);
});
exports.listUserActivitiesController = listUserActivitiesController;
const listDaysController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const days = yield (0, listDays_service_1.default)();
    return res.json(days);
});
exports.listDaysController = listDaysController;
const listCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, listCategories_service_1.default)();
    return res.json(categories);
});
exports.listCategoriesController = listCategoriesController;
const updateActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updated = yield (0, updateActivity_service_1.default)(id, Object.assign({}, updateData));
    return res.json(updated);
});
exports.updateActivityController = updateActivityController;
const updateActivityScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updated = yield (0, updateActivitySchedule_service_1.default)(id, Object.assign({}, updateData));
    return res.json(updated);
});
exports.updateActivityScheduleController = updateActivityScheduleController;
const deleteActivityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteActivity_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteActivityController = deleteActivityController;
const deleteActivityScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteActivitySchedule_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteActivityScheduleController = deleteActivityScheduleController;
const deleteDayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteDay_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteDayController = deleteDayController;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteCategory_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteCategoryController = deleteCategoryController;
