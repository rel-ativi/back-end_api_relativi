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
const categories_entity_1 = require("../../entities/categories.entity");
const AppError_1 = require("../../errors/AppError");
const createCategoryService = ({ name, }) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.Category);
    const categories = yield categoryRepo.find();
    const categoryAlreadyExists = categories.find((cat) => cat.name === name);
    if (categoryAlreadyExists) {
        throw new AppError_1.AppError("Category already registered");
    }
    const category = new categories_entity_1.Category();
    category.name = name;
    categoryRepo.create(category);
    yield categoryRepo.save(category);
    return category;
});
exports.default = createCategoryService;
