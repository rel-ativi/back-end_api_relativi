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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = __importDefault(require("../../../data-source"));
const mock_1 = require("../../mock");
describe("Create a user", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Must be able to create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: response.body.id,
            name: mock_1.userCreate.name,
            email: mock_1.userCreate.email,
            is_adm: mock_1.userCreate.is_adm,
            is_pro_user: mock_1.userCreate.is_pro_user,
            is_active: response.body.is_active,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            profile_id: response.body.profile_id
        }));
    }));
    test("Should not be able to create a user that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
