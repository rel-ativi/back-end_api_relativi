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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const activities_entity_1 = require("./activities.entity");
const cities_entity_1 = require("./cities.entity");
const countries_entity_1 = require("./countries.entity");
const districts_entity_1 = require("./districts.entity");
const profiles_entity_1 = require("./profiles.entity");
const states_entity_1 = require("./states.entity");
let Address = class Address {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 16 }),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8 }),
    __metadata("design:type", String)
], Address.prototype, "zip_code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => districts_entity_1.District, { eager: true }),
    __metadata("design:type", districts_entity_1.District)
], Address.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cities_entity_1.City, { eager: true }),
    __metadata("design:type", cities_entity_1.City)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => states_entity_1.State, { eager: true }),
    __metadata("design:type", states_entity_1.State)
], Address.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => countries_entity_1.Country, { eager: true }),
    __metadata("design:type", countries_entity_1.Country)
], Address.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => activities_entity_1.Activity || profiles_entity_1.Profile, (entity) => entity.address),
    __metadata("design:type", Object)
], Address.prototype, "address_of", void 0);
Address = __decorate([
    (0, typeorm_1.Entity)("addresses")
], Address);
exports.Address = Address;
