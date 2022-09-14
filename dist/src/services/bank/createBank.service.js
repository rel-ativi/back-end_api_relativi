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
const bank_info_entity_1 = require("../../entities/bank_info.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const createBankService = (id, { bank, agency, account_number }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new AppError_1.AppError("access denied", 404);
    }
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profilesRepo.find();
    const profile = profiles.find((prof) => prof.id === id);
    if (!profile) {
        throw new AppError_1.AppError("user not found");
    }
    if (profile.bank_info) {
        throw new AppError_1.AppError("user already has a bank");
    }
    const banksRepo = data_source_1.default.getRepository(bank_info_entity_1.BankInfo);
    const newBank = new bank_info_entity_1.BankInfo();
    newBank.account_number = account_number;
    newBank.agency = agency;
    newBank.bank = bank;
    banksRepo.create(newBank);
    yield banksRepo.save(newBank);
    profilesRepo.update(profile.id, { bank_info: newBank });
    return newBank;
});
exports.default = createBankService;
