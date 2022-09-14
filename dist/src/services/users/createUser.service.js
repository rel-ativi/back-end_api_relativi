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
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../errors/AppError");
const users_entity_1 = require("../../entities/users.entity");
const profiles_entity_1 = require("../../entities/profiles.entity");
const createUserService = ({ email, is_adm, name, password, is_pro_user, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entity_1.User);
    const profileRepository = data_source_1.default.getRepository(profiles_entity_1.Profile);
    const exists = yield userRepository.findOneBy({
        email,
    });
    if (exists) {
        throw new AppError_1.AppError("Bad request", 400);
    }
    const profile = profileRepository.create({});
    yield profileRepository.save(profile);
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const user = userRepository.create({
        name,
        email,
        is_adm,
        password: hashedPassword,
        is_active: true,
        is_pro_user,
        profile,
    });
    yield userRepository.save(user);
    const returnUser = Object.assign({}, user);
    delete returnUser.password;
    return returnUser;
});
exports.default = createUserService;
