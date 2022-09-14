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
const addresses_entity_1 = require("../../entities/addresses.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const addressesDeleteService = (id, profile_id, is_adm) => __awaiter(void 0, void 0, void 0, function* () {
    const addressesRepo = data_source_1.default.getRepository(addresses_entity_1.Address);
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const addresses = yield addressesRepo.find();
    const deleteAddress = addresses.find((address) => address.id === id);
    const profile = yield profilesRepo.findOne({
        where: { id: profile_id },
    });
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    if (!deleteAddress) {
        throw new AppError_1.AppError("Address does not exist", 404);
    }
    let is_owner = false;
    profile.addresses.forEach((add) => {
        if (add.id === deleteAddress.id)
            is_owner = true;
    });
    if (!is_owner && !is_adm) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    if (profile.address.id === deleteAddress.id) {
        yield profilesRepo.update(profile_id, {
            address: { id: undefined },
        });
        yield addressesRepo.delete(deleteAddress);
    }
});
exports.default = addressesDeleteService;
