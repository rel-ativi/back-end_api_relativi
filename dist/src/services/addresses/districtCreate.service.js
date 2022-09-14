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
const districts_entity_1 = require("../../entities/districts.entity");
const AppError_1 = require("../../errors/AppError");
const createDistrictService = ({ name, }) => __awaiter(void 0, void 0, void 0, function* () {
    const districtRepository = data_source_1.default.getRepository(districts_entity_1.District);
    const districts = yield districtRepository.find();
    const districtAlreadyExists = districts.find((dis) => dis.name === name);
    if (districtAlreadyExists) {
        throw new AppError_1.AppError("District already registered");
    }
    const district = new districts_entity_1.District();
    district.name = name;
    districtRepository.create(district);
    yield districtRepository.save(district);
    return district;
});
exports.default = createDistrictService;
