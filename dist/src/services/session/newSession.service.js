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
const bcryptjs_1 = require("bcryptjs");
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = require("../../errors/AppError");
const data_source_1 = __importDefault(require("../../data-source"));
const newSessionService = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const user = yield userRepo.findOne({ where: { email: email } });
    if (!user) {
        throw new AppError_1.AppError("Invalid credentials", 403);
    }
    if (!user.is_active) {
        throw new AppError_1.AppError("User is not active");
    }
    const matchPassword = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!matchPassword) {
        throw new AppError_1.AppError("Invalid credentials", 403);
    }
    const token = jsonwebtoken_1.default.sign({
        is_adm: user.is_adm,
        is_active: user.is_active,
        profile_id: user.profile.id,
        is_pro_user: user.is_pro_user,
    }, process.env.SECRET_KEY, {
        subject: user.id,
        expiresIn: "2h",
    });
    return token;
});
exports.default = newSessionService;
