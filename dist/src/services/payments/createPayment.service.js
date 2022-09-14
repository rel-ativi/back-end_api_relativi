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
const createPaymentService = (id, { card_name, card, due_date, sec_code }) => __awaiter(void 0, void 0, void 0, function* () {
    const profileRepository = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const profiles = yield profileRepository.find();
    const profile = profiles.find((prof) => prof.id === id);
    if (!profile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    if (profile.payment_info) {
        throw new AppError_1.AppError("user already has a payment method");
    }
    const paymentInfoRepository = data_source_1.default.getRepository(payment_info_entity_1.PaymentInfo);
    const payments = yield paymentInfoRepository.find();
    const strSecCode = sec_code.toString();
    const strCardNumber = card.toString();
    if (strSecCode.length > 3 || strSecCode.length < 3) {
        throw new AppError_1.AppError("Invalid code");
    }
    if (strCardNumber.length < 16 || strCardNumber.length > 16) {
        throw new AppError_1.AppError("Invalid card");
    }
    const aDate = new Date(due_date);
    console.log(aDate);
    const payment = new payment_info_entity_1.PaymentInfo();
    payment.card_name = card_name;
    payment.card = card;
    payment.due_date = due_date;
    payment.sec_code = sec_code;
    paymentInfoRepository.create(payment);
    yield paymentInfoRepository.save(payment);
    profileRepository.update(profile.id, { payment_info: payment });
    return payment;
});
exports.default = createPaymentService;
