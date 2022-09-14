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
const newSession_service_1 = __importDefault(require("../../../services/session/newSession.service"));
const createUser_service_1 = __importDefault(require("../../../services/users/createUser.service"));
const mock_1 = require("../../mock");
describe("Logging in test unit", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then(res => connection = res)
            .catch(err => console.error("Error during Data Source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test("Should be able to login with the user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, createUser_service_1.default)(mock_1.userCreate);
        const result = yield (0, newSession_service_1.default)(mock_1.admLogin);
        expect(result).toHaveProperty("token");
    }));
    test("Should not be able to login with the user with incorrect password or email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, newSession_service_1.default)(mock_1.notAdmLogin);
        expect(result).toHaveProperty("message");
    }));
});
