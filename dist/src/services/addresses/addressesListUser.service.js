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
const listUserAdressesService = (profile_id) => __awaiter(void 0, void 0, void 0, function* () {
    const addressesRepo = data_source_1.default.getRepository(addresses_entity_1.Address);
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const addresses = yield addressesRepo.find();
    const profile = yield profilesRepo.findOne({ where: { id: profile_id } });
    const usersAddresses = addresses.filter((add) => add.created_by === profile);
    return usersAddresses;
});
exports.default = listUserAdressesService;
