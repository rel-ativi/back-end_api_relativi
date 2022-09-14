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
describe("Update a user", () => {
    let connection;
    let response1;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
        response1 = yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Trying to update a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseUpdate = yield (0, supertest_1.default)(app_1.default).patch(`/users/${response1.body.id}`).send(mock_1.userUpdate);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/users/${response1.body.id}`);
        expect(responseUpdate.status).toBe(200);
        expect(responseUpdate.body).toHaveProperty("message");
        expect(response.body).toEqual(expect.objectContaining({
            id: response.body.id,
            name: mock_1.userCreate.name,
            email: mock_1.userCreate.email,
            password: mock_1.userCreate.password,
            is_adm: mock_1.userCreate.is_adm,
            is_pro_user: mock_1.userCreate.is_pro_user,
            is_active: response.body.is_active,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            profile_id: response.body.profile_id
        }));
    }));
    test("Trying to update a user that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).patch("/users/1");
        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't be able to update user with isActive = false", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const userUpdated = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/${userUpdated.body.id}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to update user without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/${response1.body.id}`).send(mock_1.userUpdate);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to update user not being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreateNotAdm);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.notAdmLogin);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/${response1.body.id}`).send(mock_1.userUpdate).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("Should not be able to update user with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).send(mock_1.userUpdate).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
