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
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const listUserActivitiesService = (profile_id) => __awaiter(void 0, void 0, void 0, function* () {
    const profileRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profileRepo.find();
    const profile = profiles.find((pro) => pro.id === profile_id);
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    if (profile.activities.length === 0) {
        throw new AppError_1.AppError("No activities found", 404);
    }
    return profile.activities;
});
exports.default = listUserActivitiesService;
