"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityScheduleSchema = exports.activitySchema = void 0;
const yup = __importStar(require("yup"));
const address_schema_1 = require("./address.schema");
exports.activitySchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    min_users: yup.number(),
    max_users: yup.number().required(),
    duration: yup.string().required(),
    category_id: yup.string().required(),
    recurrent: yup.boolean().required(),
    starting_date: yup.string().required(),
    address: address_schema_1.addressSchema,
    activity_schedule_id: yup.string(),
    image_url: yup.string(),
});
exports.activityScheduleSchema = yup
    .object()
    .shape({
    time: yup.string().required(),
    days: yup.array(),
});
