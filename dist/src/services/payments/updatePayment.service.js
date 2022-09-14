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
const payment_info_entity_1 = require("../../entities/payment_info.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const AppError_1 = require("../../errors/AppError");
const data_source_1 = __importDefault(require("../../data-source"));
const updatePaymentService = (id, { card_name, card, due_date, sec_code }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    const profilesRepo = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profilesRepo.find();
    const profile = profiles.find((prof) => prof.id === id);
    if (!profile) {
        throw new AppError_1.AppError("Access denied", 403);
    }
    const paymentsRepo = data_source_1.default.getRepository(payment_info_entity_1.PaymentInfo);
    const payments = yield paymentsRepo.find();
    const updatePayment = payments.find((pay) => pay.id === profile.payment_info.id);
    if (!updatePayment) {
        throw new AppError_1.AppError("No payment found", 404);
    }
    yield paymentsRepo.update(updatePayment.id, {
        card_name: card_name || updatePayment.card_name,
        card: card || updatePayment.card,
        due_date: due_date || updatePayment.due_date,
        sec_code: sec_code || updatePayment.sec_code,
    });
    const updated = yield paymentsRepo.findOneBy({ id: updatePayment.id });
    return updated;
});
exports.default = updatePaymentService;
