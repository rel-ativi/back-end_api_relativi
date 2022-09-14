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
const states_entity_1 = require("../../entities/states.entity");
const AppError_1 = require("../../errors/AppError");
const deleteStatetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const stateRepository = data_source_1.default.getRepository(states_entity_1.State);
    const state = yield stateRepository.find();
    const deleteState = state.find((sta) => sta.id === id);
    if (!deleteState) {
        throw new AppError_1.AppError('State does not exist', 404);
    }
    yield stateRepository.delete(deleteState);
});
exports.default = deleteStatetService;
