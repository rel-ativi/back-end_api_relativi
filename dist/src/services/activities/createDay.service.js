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
const days_entity_1 = require("../../entities/days.entity");
const AppError_1 = require("../../errors/AppError");
const createDayService = ({ name, number, }) => __awaiter(void 0, void 0, void 0, function* () {
    const daysrRepo = data_source_1.default.getRepository(days_entity_1.Day);
    const allDays = yield daysrRepo.find();
    const dayAlreadyExists = allDays.find((d) => d.name === name && d.number === number);
    if (dayAlreadyExists) {
        throw new AppError_1.AppError("Day already registered");
    }
    if (number < 0 || number > 6) {
        throw new AppError_1.AppError("Invalid number");
    }
    const day = new days_entity_1.Day();
    day.name = name;
    day.number = number;
    daysrRepo.create(day);
    yield daysrRepo.save(day);
    return day;
});
exports.default = createDayService;
