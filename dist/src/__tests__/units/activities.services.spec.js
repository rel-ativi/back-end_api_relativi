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
const createCategory_service_1 = __importDefault(require("../../services/activities/createCategory.service"));
const createDay_service_1 = __importDefault(require("../../services/activities/createDay.service"));
const deleteCategory_service_1 = __importDefault(require("../../services/activities/deleteCategory.service"));
const mock_1 = require("../mock");
describe("Testing category services", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((error) => {
            console.log(error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Should be able to create a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, createCategory_service_1.default)(mock_1.createCategory);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result.name).toBe(mock_1.createCategory.name);
    }));
    it("Should not be able to create a category with the same name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, createCategory_service_1.default)(mock_1.createCategory);
        })).rejects.toThrow("Category already registered");
    }));
    it("Should be able to delete a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, createCategory_service_1.default)(mock_1.deleteCategory);
        const result = yield (0, deleteCategory_service_1.default)(newCategory.id);
        expect(result).toBe(undefined);
    }));
});
describe("Testing day services", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((error) => {
            console.log(error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Should be able to create a day", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, createDay_service_1.default)(mock_1.createDay);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("number");
        expect(result.name).toBe(mock_1.createDay.name);
        expect(result.number).toBe(mock_1.createDay.number);
    }));
    it("Should not be able to create a day with the same name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, createDay_service_1.default)(mock_1.createDay);
        })).rejects.toThrow("Day already registered");
    }));
    it("Should be able to delete a day", () => __awaiter(void 0, void 0, void 0, function* () {
        const newDay = yield (0, createCategory_service_1.default)(mock_1.deleteDay);
        const result = yield (0, deleteCategory_service_1.default)(newDay.id);
        expect(result).toBe(undefined);
    }));
});
// describe("Testing activity services", () => {
//   let connection: DataSource;
//   beforeAll(async () => {
//     await AppDataSource.initialize()
//       .then((res) => {
//         connection = res;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//   afterAll(async () => {
//     await connection.destroy();
//   });
// });
