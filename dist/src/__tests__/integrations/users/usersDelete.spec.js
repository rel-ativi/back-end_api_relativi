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
describe("Delete a user", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Must be able to soft delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const userDeleted = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        const findUser = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(findUser.body[0].is_active).toBe(false);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't be able to delete user with isActive = false", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const userDeleted = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to delete user without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const userDeleted = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${userDeleted.body.id}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to delete user not being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreateNotAdm);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.notAdmLogin);
        const userDeleted = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to delete user with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
