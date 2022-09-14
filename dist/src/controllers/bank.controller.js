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
exports.deleteBankController = exports.updateBankController = exports.createBankController = void 0;
const createBank_service_1 = __importDefault(require("../services/bank/createBank.service"));
const updateBank_service_1 = __importDefault(require("../services/bank/updateBank.service"));
const deleteBank_service_1 = __importDefault(require("../services/bank/deleteBank.service"));
const createBankController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bankData = req.body;
    const { profile_id } = req.user;
    const newBank = yield (0, createBank_service_1.default)(profile_id, Object.assign({}, bankData));
    return res.status(201).json(newBank);
});
exports.createBankController = createBankController;
const updateBankController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bankData = req.body;
    const { profile_id } = req.user;
    const updateBank = yield (0, updateBank_service_1.default)(profile_id, Object.assign({}, bankData));
    return res.status(200).json(updateBank);
});
exports.updateBankController = updateBankController;
const deleteBankController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    yield (0, deleteBank_service_1.default)(profile_id);
    return res.status(204).send();
});
exports.deleteBankController = deleteBankController;
