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
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const data_source_1 = __importDefault(require("../../data-source"));
const bank_info_entity_1 = require("../../entities/bank_info.entity");
const updateBankService = (id, { bank, agency, account_number }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profilesRepo.find();
    const profile = profiles.find((prof) => prof.id === id);
    if (!profile) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    const banksRepo = data_source_1.default.getRepository(bank_info_entity_1.BankInfo);
    const banks = yield banksRepo.find();
    const updateBank = banks.find((ban) => ban.id === profile.bank_info.id);
    if (!updateBank) {
        throw new AppError_1.AppError("No bank found", 404);
    }
    yield banksRepo.update(updateBank.id, {
        bank: bank || updateBank.bank,
        agency: agency || updateBank.agency,
        account_number: account_number || updateBank.agency,
    });
    const updated = yield banksRepo.findOneBy({ id: updateBank.id });
    return updated;
});
exports.default = updateBankService;
