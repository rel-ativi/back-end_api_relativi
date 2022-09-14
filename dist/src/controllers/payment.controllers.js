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
exports.deletePaymentController = exports.updatePaymentController = exports.createPaymentController = void 0;
const class_transformer_1 = require("class-transformer");
const createPayment_service_1 = __importDefault(require("../services/payments/createPayment.service"));
const deletePayment_service_1 = __importDefault(require("../services/payments/deletePayment.service"));
const updatePayment_service_1 = __importDefault(require("../services/payments/updatePayment.service"));
const createPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    const payemntData = req.body;
    const payment = yield (0, createPayment_service_1.default)(profile_id, Object.assign({}, payemntData));
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(payment));
});
exports.createPaymentController = createPaymentController;
const updatePaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentData = req.body;
    const { profile_id } = req.user;
    const updatedPayment = yield (0, updatePayment_service_1.default)(profile_id, Object.assign({}, paymentData));
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(updatedPayment));
});
exports.updatePaymentController = updatePaymentController;
const deletePaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    yield (0, deletePayment_service_1.default)(profile_id);
    return res.status(204).json();
});
exports.deletePaymentController = deletePaymentController;
