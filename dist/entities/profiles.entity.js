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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const activities_entity_1 = require("./activities.entity");
const addresses_entity_1 = require("./addresses.entity");
const bank_info_entity_1 = require("./bank_info.entity");
const payment_info_entity_1 = require("./payment_info.entity");
const user_activity_history_entity_1 = require("./user_activity_history.entity");
const user_certifications_entity_1 = require("./user_certifications.entity");
const user_schedule_entity_1 = require("./user_schedule.entity");
let Profile = class Profile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512 }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 24 }),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => addresses_entity_1.Address, (address) => address.address_of, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.Address)
], Profile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_info_entity_1.BankInfo, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", bank_info_entity_1.BankInfo)
], Profile.prototype, "bank_info", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_info_entity_1.PaymentInfo, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", payment_info_entity_1.PaymentInfo)
], Profile.prototype, "payment_info_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_certifications_entity_1.Certification, (certifications) => certifications.profile, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Profile.prototype, "certifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_schedule_entity_1.UserSchedule, (schedule) => schedule.profile, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Profile.prototype, "scheduled_activities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_history_entity_1.ActivityHistory, (schedule) => schedule.profile, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Profile.prototype, "activity_history", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => activities_entity_1.Activity, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Profile.prototype, "favorite_activities", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)("profiles")
], Profile);
exports.Profile = Profile;
