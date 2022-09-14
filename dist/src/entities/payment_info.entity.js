"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInfo = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
let PaymentInfo = class PaymentInfo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PaymentInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "card_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], PaymentInfo.prototype, "sec_code", void 0);
PaymentInfo = __decorate([
    (0, typeorm_1.Entity)("payment_info")
], PaymentInfo);
exports.PaymentInfo = PaymentInfo;
