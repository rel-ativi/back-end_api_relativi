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
const data_source_1 = __importDefault(require("../../data-source"));
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = require("../../errors/AppError");
const updateUserService = (name, email, password, id) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepo = data_source_1.default.getRepository(users_entity_1.User);
    const users = yield usersRepo.find();
    const user = users.find((u) => u.id === id);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    if (!name && !email && !password) {
        throw new AppError_1.AppError("Nothing to update", 400);
    }
    yield usersRepo.update(id, {
        name: name || user.name,
        email: email || user.email,
        password: !!password ? yield (0, bcryptjs_1.hash)(password, 10) : user.password,
    });
    const updated = yield usersRepo.findOneBy({
        id,
    });
    return updated;
});
exports.default = updateUserService;
