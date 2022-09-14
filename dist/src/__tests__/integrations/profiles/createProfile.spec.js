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
describe("Create a profile", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Trying to create a profile", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userCreate);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.admLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post("/profile").send(mock_1.createProfile).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: response.body.id,
            bio: mock_1.createProfile === null || mock_1.createProfile === void 0 ? void 0 : mock_1.createProfile.bio,
            phone: mock_1.createProfile === null || mock_1.createProfile === void 0 ? void 0 : mock_1.createProfile.phone,
            address: mock_1.createProfile === null || mock_1.createProfile === void 0 ? void 0 : mock_1.createProfile.address,
            bank_info: mock_1.createProfile === null || mock_1.createProfile === void 0 ? void 0 : mock_1.createProfile.bank_info,
            payment_info_id: (_a = response.body) === null || _a === void 0 ? void 0 : _a.payment_info_id,
            certifications: (_b = response.body) === null || _b === void 0 ? void 0 : _b.certifications,
            scheduled_activities: (_c = response.body) === null || _c === void 0 ? void 0 : _c.scheduled_activities,
            activity_history: (_d = response.body) === null || _d === void 0 ? void 0 : _d.activity_history,
            favorite_activities: (_e = response.body) === null || _e === void 0 ? void 0 : _e.favorite_activities
        }));
    }));
    test("Should not be able to create profile without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/profile").send(mock_1.createProfile);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
