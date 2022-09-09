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
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const activity_schedule_entity_1 = require("./activity_schedule.entity");
const addresses_entity_1 = require("./addresses.entity");
const categories_entity_1 = require("./categories.entity");
const user_activity_history_entity_1 = require("./user_activity_history.entity");
const user_schedule_entity_1 = require("./user_schedule.entity");
let Activity = class Activity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], Activity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], Activity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", default: 1 }),
    __metadata("design:type", Number)
], Activity.prototype, "min_users", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Activity.prototype, "max_users", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 2, scale: 2 }),
    __metadata("design:type", Number)
], Activity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Activity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Activity.prototype, "recurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Activity.prototype, "starting_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Activity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Category, { eager: true }),
    __metadata("design:type", categories_entity_1.Category)
], Activity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => addresses_entity_1.Address, (address) => address.address_of, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.Address)
], Activity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => activity_schedule_entity_1.ActivitySchedule, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", activity_schedule_entity_1.ActivitySchedule)
], Activity.prototype, "activity_schedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_schedule_entity_1.UserSchedule, (schedule) => schedule.activity),
    __metadata("design:type", Array)
], Activity.prototype, "scheduled_users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_history_entity_1.ActivityHistory, (schedule) => schedule.activity),
    __metadata("design:type", Array)
], Activity.prototype, "users_history", void 0);
Activity = __decorate([
    (0, typeorm_1.Entity)("activities")
], Activity);
exports.Activity = Activity;
