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
describe("Update a profile", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return connection.destroy(); }));
    test("Trying to update profile", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const responseUpdate = yield (0, supertest_1.default)(app_1.default).patch("/profile").send(mock_1.updateProfile).set("Authorization", `Bearer ${login.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).post("/profile").send(mock_1.createProfile).set("Authorization", `Bearer ${login.body.token}`);
        expect(responseUpdate.status).toBe(200);
        expect(responseUpdate.body).toHaveProperty("message");
        expect(response.body).toEqual(expect.objectContaining({
            id: response.body.id,
            bio: responseUpdate === null || responseUpdate === void 0 ? void 0 : responseUpdate.body.bio,
            phone: responseUpdate === null || responseUpdate === void 0 ? void 0 : responseUpdate.body.phone,
            address: (_a = responseUpdate.body) === null || _a === void 0 ? void 0 : _a.address,
            bank_info: (_b = responseUpdate.body) === null || _b === void 0 ? void 0 : _b.bank_info,
            payment_info_id: (_c = responseUpdate.body) === null || _c === void 0 ? void 0 : _c.payment_info_id,
            certifications: (_d = response.body) === null || _d === void 0 ? void 0 : _d.certifications,
            scheduled_activities: (_e = response.body) === null || _e === void 0 ? void 0 : _e.scheduled_activities,
            activity_history: (_f = response.body) === null || _f === void 0 ? void 0 : _f.activity_history,
            favorite_activities: (_g = response.body) === null || _g === void 0 ? void 0 : _g.favorite_activities
        }));
    }));
    test("Should not be able to update profile without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).patch("/profile").send(mock_1.updateProfile);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
