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
exports.deleteScheduleController = exports.listScheduleController = exports.createScheduleController = void 0;
const class_transformer_1 = require("class-transformer");
const createSchedule_service_1 = __importDefault(require("../services/schedules/createSchedule.service"));
const deleteSchedule_service_1 = __importDefault(require("../services/schedules/deleteSchedule.service"));
const listSchedule_service_1 = __importDefault(require("../services/schedules/listSchedule.service"));
const createScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const date = req.body;
    const { profile_id } = req.user;
    const schedule = yield (0, createSchedule_service_1.default)(id, profile_id, date);
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(schedule));
});
exports.createScheduleController = createScheduleController;
const listScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    const schedules = yield (0, listSchedule_service_1.default)(profile_id);
    return res.json((0, class_transformer_1.instanceToPlain)(schedules));
});
exports.listScheduleController = listScheduleController;
const deleteScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteSchedule_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteScheduleController = deleteScheduleController;
