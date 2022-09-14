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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mock_1 = require("../../mock");
describe("Delete a bank_info", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Trying to delete a bank_info", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const bank_info = yield (0, supertest_1.default)(app_1.default).post("/bank_info").send(mock_1.createBank);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/bank_info/${bank_info.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to delete bank_info without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const bank_info = yield (0, supertest_1.default)(app_1.default).post("/bank_info").send(mock_1.createBank);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/bank_info/${bank_info.body.id}`).send(mock_1.createBank);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to delete bank_info not being pro_user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreateNotAdm);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.notAdmLogin);
        const bank_info = yield (0, supertest_1.default)(app_1.default).post("/bank_info").send(mock_1.createBank);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/bank_info/${bank_info.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
});
