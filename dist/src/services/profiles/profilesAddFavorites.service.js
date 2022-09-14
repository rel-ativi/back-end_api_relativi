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
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const profilesAddFavoritesService = (profile_id, activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    const profileRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const activityRepo = data_source_1.default.getRepository(activities_entity_1.Activity);
    const profiles = yield profileRepo.find();
    const activities = yield activityRepo.find();
    const profile = profiles.find((prof) => prof.id === profile_id);
    const findActivity = activities.find((act) => act.id === activity_id);
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    if (!findActivity) {
        throw new AppError_1.AppError("Activity not found", 404);
    }
    const activity = profile.favorite_activities.find((act) => act.id === activity_id);
    if (activity) {
        profile.favorite_activities = profile.favorite_activities.filter((act) => {
            return act.id !== activity.id;
        });
        yield profileRepo.save(profile);
        return profile.favorite_activities;
    }
    else {
        profile.favorite_activities = [
            ...profile.favorite_activities,
            findActivity,
        ];
        yield profileRepo.save(profile);
        return profile.favorite_activities;
    }
});
exports.default = profilesAddFavoritesService;
