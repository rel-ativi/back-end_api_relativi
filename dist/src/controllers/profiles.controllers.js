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
exports.profilesListFavoritesController = exports.profilesAddFavoritesController = exports.profilesUpdateController = void 0;
const profilesAddFavorites_service_1 = __importDefault(require("../services/profiles/profilesAddFavorites.service"));
const profilesListFavorites_service_1 = __importDefault(require("../services/profiles/profilesListFavorites.service"));
const profilesUpdate_service_1 = __importDefault(require("../services/profiles/profilesUpdate.service"));
const profilesUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bio, phone } = req.body;
    const { profile_id } = req.user;
    const update = yield (0, profilesUpdate_service_1.default)(profile_id, { bio, phone });
    return res.status(201).json(update);
});
exports.profilesUpdateController = profilesUpdateController;
const profilesAddFavoritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    const { id } = req.params;
    const favorites = yield (0, profilesAddFavorites_service_1.default)(profile_id, id);
    return res.status(201).json(favorites);
});
exports.profilesAddFavoritesController = profilesAddFavoritesController;
const profilesListFavoritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile_id } = req.user;
    const list = yield (0, profilesListFavorites_service_1.default)(profile_id);
    return res.status(200).json(list);
});
exports.profilesListFavoritesController = profilesListFavoritesController;
